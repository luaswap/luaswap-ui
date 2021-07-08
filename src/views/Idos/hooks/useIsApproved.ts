import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { Contract } from 'web3-eth-contract'

/**
 * Check if user approve to spend the pay token amount or not
 * If the pay token is native token - we can skip this step
 */
const useIsApproved = (tokenContract: Contract, spenderAddress: string): [a: boolean, b: () => any] => {
  const [isApproved, setIsApproved] = useState(false)
  const { account } = useWeb3React()
  const fetchAllowanceData = async () => {
    try {
      const allowance = await tokenContract.methods.allowance(account, spenderAddress).call()
      const bnAllowance = new BigNumber(allowance)
      if (bnAllowance.isGreaterThan(0)) {
        setIsApproved(true)
        return null
      }

      setIsApproved(false)
      return null
    } catch (error) {
      setIsApproved(false)
      console.log(error, 'fail to fetch allowance info of user')
      return null
    }
  }

  useEffect(() => {
    if (tokenContract) {
      fetchAllowanceData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, spenderAddress])

  return [isApproved, fetchAllowanceData]
}

export default useIsApproved
