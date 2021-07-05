import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useLuaIdoContract } from 'hooks/useContract'
import { mappingIdoResponse } from 'state/ido/fetchIdosData'
import { IdoDetail } from 'state/types'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { useBlock } from 'state/hooks'

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

const useDataFromIdoContract = (contractAddress: string, idoIndex: string): [a: IdoDetail, b: string] => {
  const { account } = useWeb3React()
  const luaIdoContract = useLuaIdoContract(contractAddress)
  const [idoDetail, setIdoDetail] = useState<IdoDetail>(defaultIdoDetail)
  const [totalUserCommitted, setTotalUserCommitted] = useState<string>('0')
  const { currentBlock } = useBlock()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contractIdoDetail = await luaIdoContract.methods.IDOs(idoIndex).call()
        const commitedAmount = await luaIdoContract.methods.userCommitedAmount(account, idoIndex).call()
        setIdoDetail(mappingIdoResponse(contractIdoDetail))
        setTotalUserCommitted(getFullDisplayBalance(commitedAmount))
      } catch (error) {
        console.log(error, 'error to fetch data from contract')
      }
    }

    if (account) {
      fetchData()
    }
  }, [luaIdoContract, account, currentBlock, idoIndex])

  return [idoDetail, totalUserCommitted]
}

export default useDataFromIdoContract
