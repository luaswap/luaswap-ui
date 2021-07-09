import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useLuaIdoContract } from 'hooks/useContract'
import { mappingIdoResponse } from 'state/ido/fetchIdosData'
import { IdoDetail } from 'state/types'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { formatIdoContract } from 'utils/formatPoolData'
import { getWeb3BasedOnChainId } from 'utils/web3'
import { getLuaIdoContract } from 'utils/contractHelpers'
import makeBatchRequest from 'utils/makeBatchRequest'
import { useBlock } from 'state/hooks'
import { IdoDetailInfo } from '../types'

const defaultIdoDetail = {
  claimAt: null,
  closeAt: null,
  creator: null,
  idoToken: null,
  maxAmountPay: null,
  minAmountPay: null,
  openAt: null,
  payToken: null,
  swappedAmountIDO: null,
  swappedAmountPay: null,
  totalAmountIDO: null,
  totalAmountPay: null,
  totalCommittedAmount: null,
}

/**
 * This hook fetch live data from contract IDO based on current blocknumber
 * @param contractAddress Ido contract address
 * @param idoIndex Index of the current IDO in contract (based on chain id and user tier)
 * @param idoIndexes List of idos for each chain id in this IDO
 * @returns Data of the current IDO on contract and amount of committed token of current User
 */
const useDataFromIdoContract = (
  contractAddress: string,
  idoIndex: number,
  idoIndexes: Record<string, IdoDetailInfo[]>,
): [idoData: IdoDetail, commitedAmount: string] => {
  const { account, chainId } = useWeb3React()
  // Current Lua Ido contract based on log in chainid
  const luaIdoContract = useLuaIdoContract(contractAddress)
  const [idoDetail, setIdoDetail] = useState<IdoDetail>(defaultIdoDetail)
  const [totalUserCommitted, setTotalUserCommitted] = useState<string>('0')
  const { currentBlock } = useBlock()
  useEffect(() => {
    const fetchData = async () => {
      const idosOfEachChainId = {}
      try {
        /**
         * We loop through every index and get all idos info in each index
         * @returns {
         *  Chainid: []Promise<Idos>
         * }
         */
        Object.keys(idoIndexes).forEach((idoChainId) => {
          const idosOfCurrentChainId = []
          idoIndexes[idoChainId].forEach((ido) => {
            // We will get new contract based on addressIdoContract received from API
            const luaContractAddress = ido.addressIdoContract
            const web3 = getWeb3BasedOnChainId(Number(idoChainId))
            const currentLuaIdoContract = getLuaIdoContract(web3, luaContractAddress)
            const contractIdoDetail = currentLuaIdoContract.methods.IDOs(ido.index).call
            idosOfCurrentChainId.push(contractIdoDetail)
          })
          idosOfEachChainId[idoChainId] = idosOfCurrentChainId
        })
        /**
         * We map through all the idos in each chain id and use web3 provider of that chainid to fetch data
         * from IDO contract
         * @param chainids - Array of all available chain ids for this project
         * @returns Total data of all chain ids for this project
         */
        const processMultipleChainid = async (chainids) => {
          const generatedResponse = []
          await Promise.all(
            chainids.map(async (cid) => {
              try {
                const web3 = getWeb3BasedOnChainId(Number(cid))
                // idos here is all idos of a single chain id
                const idos = idosOfEachChainId[cid]
                const dataList = await makeBatchRequest(idos, web3)
                const mappedContractIdoList = dataList.map((ido) => mappingIdoResponse(ido))
                const allTiersDataFromContract = formatIdoContract(mappedContractIdoList)
                generatedResponse.push(allTiersDataFromContract)
              } catch (error) {
                console.log(error)
              }
            }),
          )
          return generatedResponse
        }
        const chainIdsIdos = await processMultipleChainid(Object.keys(idosOfEachChainId))
        const allTiersDataFromContract = formatIdoContract(chainIdsIdos)
        setIdoDetail(allTiersDataFromContract)
        /**
         * Get total committed amount of current user
         */
        const commitedAmount = await luaIdoContract.methods.userCommitedAmount(account, idoIndex).call()
        setTotalUserCommitted(getFullDisplayBalance(commitedAmount))
      } catch (error) {
        console.log(error, 'error to fetch data from contract')
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBlock, chainId])

  return [idoDetail, totalUserCommitted]
}

export default useDataFromIdoContract
