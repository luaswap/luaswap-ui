import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useLuaIdoContract } from 'hooks/useContract'
import { mappingIdoResponse } from 'state/ido/fetchIdosData'
import { IdoDetail } from 'state/types'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { formatIdoContract } from 'utils/formatPoolData'
import makeBatchRequest from 'utils/makeBatchRequest'
import { getWeb3BasedOnChainId } from 'utils/web3'
import useWeb3 from 'hooks/useWeb3'
import { useBlock } from 'state/hooks'
import { ChainId, IdoDetailInfo } from '../types'

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
 * @param idoIndex Index of the current IDO in contract
 * @param idoIndexes List of indexes for each Tier in this IDO
 * @returns Data of the current IDO on contract and amount of committed token of current User
 */
const useDataFromIdoContract = (
  contractAddress: string,
  idoIndex: number,
  idoIndexes,
): [idoData: IdoDetail, commitedAmount: string] => {
  const { account, chainId } = useWeb3React()
  // const web3 = useWeb3()
  const luaIdoContract = useLuaIdoContract(contractAddress)
  const [idoDetail, setIdoDetail] = useState<IdoDetail>(defaultIdoDetail)
  const [list, setList] = useState([])
  const [totalUserCommitted, setTotalUserCommitted] = useState<string>('0')
  const { currentBlock } = useBlock()
  useEffect(() => {
    const fetchData = async () => {
      const idosOfAllTiers = {}
      const allTiersData = []
      try {
        /**
         * Get data of all idos of all chainid
         */
        Object.keys(idoIndexes).forEach((idoChainId) => {
          const idosOfCurrentChainId = []
          idoIndexes[idoChainId].forEach((ido) => {
            const contractIdoDetail = luaIdoContract.methods.IDOs(ido.index).call
            idosOfCurrentChainId.push(contractIdoDetail)
          })
          idosOfAllTiers[idoChainId] = idosOfCurrentChainId
        })
        Object.keys(idosOfAllTiers).forEach(async (idoChainId) => {
          const web3 = getWeb3BasedOnChainId(Number(idoChainId))
          const readIdosDataFromChainId = async (cid: string, w3) => {
            const idos = idosOfAllTiers[cid]
            const dataList = await makeBatchRequest(idos, w3)
            const mappedContractIdoList = dataList.map((ido) => mappingIdoResponse(ido))
            const allTiersDataFromContract = formatIdoContract(mappedContractIdoList)

            return allTiersDataFromContract
          }
          const result = await readIdosDataFromChainId(idoChainId, web3)
          console.log(result, 'result receive from contract')
        })
        // const dataList = await makeBatchRequest(idosOfAllTiers, web3)
        // const dataList = await Promise.all(idosOfAllTiers)
        const mappedContractIdoList = [].map((ido) => mappingIdoResponse(ido))
        const allTiersDataFromContract = formatIdoContract(mappedContractIdoList)
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

    if (account) {
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBlock, chainId])

  return [idoDetail, totalUserCommitted]
}

export default useDataFromIdoContract
