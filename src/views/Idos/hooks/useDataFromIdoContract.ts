import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useLuaIdoContract } from 'hooks/useContract'
import { mappingIdoResponse } from 'state/ido/fetchIdosData'
import { IdoDetail } from 'state/types'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { formatIdoContract } from 'utils/formatPoolData'
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

const useDataFromIdoContract = (
  contractAddress: string,
  idoIndex: string,
  idoIndexes: IdoDetailInfo[],
): [a: IdoDetail, b: string] => {
  const { account } = useWeb3React()
  const luaIdoContract = useLuaIdoContract(contractAddress)
  const [idoDetail, setIdoDetail] = useState<IdoDetail>(defaultIdoDetail)
  const [totalUserCommitted, setTotalUserCommitted] = useState<string>('0')
  const { currentBlock } = useBlock()
  useEffect(() => {
    const fetchData = async () => {
      const idosOfAllTiers = []
      try {
        /**
         * Get data of all idos of current chainid
         */
        idoIndexes.forEach((ido) => {
          const contractIdoDetail = luaIdoContract.methods.IDOs(ido.index).call()
          idosOfAllTiers.push(contractIdoDetail)
        })
        const dataList = await Promise.all(idosOfAllTiers)
        const mappedContractIdoList = dataList.map((ido) => mappingIdoResponse(ido))
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
  }, [currentBlock])

  return [idoDetail, totalUserCommitted]
}

export default useDataFromIdoContract
