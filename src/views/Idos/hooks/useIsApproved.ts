import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { Contract } from 'web3-eth-contract'

/**
 * Check if user approve to spend the pay token amount or not
 * If the pay token is native token - we can skip this step
 */
const useIsApproved = (tokenContract: Contract, spenderAddress: string): [a: boolean, b: () => any, c: boolean] => {
  const [isApproved, setIsApproved] = useState(false)
  const [isLoadingApproved, setIsLoadingApproved] = useState(true)
  const { account } = useWeb3React()
  const fetchAllowanceData = async () => {
    try {
      setIsLoadingApproved(true)
      const allowance = await tokenContract.methods.allowance(account, spenderAddress).call()
      const bnAllowance = new BigNumber(allowance)
      if (bnAllowance.isGreaterThan(0)) {
        setIsApproved(true)
        setIsLoadingApproved(false)
        return null
      }

      setIsApproved(false)
      setIsLoadingApproved(false)
      return null
    } catch (error) {
      setIsApproved(false)
      setIsLoadingApproved(false)
      console.log(error, 'fail to fetch allowance info of user')
      return null
    }
  }

  useEffect(() => {
    if (tokenContract && account && spenderAddress) {
      fetchAllowanceData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, spenderAddress])

  return [isApproved, fetchAllowanceData, isLoadingApproved]
}

export default useIsApproved
