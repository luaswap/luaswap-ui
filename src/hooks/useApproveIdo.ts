import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Contract } from 'web3-eth-contract'
import useWeb3 from 'hooks/useWeb3'
import { approveIdo } from 'utils/callHelpers'

// Approve a Pay token if pay token is not native token
// eslint-disable-next-line import/prefer-default-export
export const useApproveIdo = (paytokenContract: Contract, idoContractAddress: string) => {
  const { account, chainId } = useWeb3React()
  const web3 = useWeb3()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approveIdo(paytokenContract, idoContractAddress, account, chainId)
      return tx
    } catch (e) {
      return false
    }
  }, [account, paytokenContract, chainId, idoContractAddress])

  return { onApprove: handleApprove }
}
