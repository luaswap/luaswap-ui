import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Contract } from 'web3-eth-contract'
import { ethers } from 'ethers'
import { useAppDispatch } from 'state'
import { fetchFarmUserDataAsync } from 'state/actions'
import useWeb3 from 'hooks/useWeb3'
import { approve } from 'utils/callHelpers'
import { useMasterchef } from './useContract'

// Approve a Farm
// eslint-disable-next-line import/prefer-default-export
export const useApprove = (lpContract: Contract) => {
  const dispatch = useAppDispatch()
  const { account, chainId } = useWeb3React()
  const web3 = useWeb3()
  const masterChefContract = useMasterchef(chainId)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterChefContract, account, chainId)
      dispatch(fetchFarmUserDataAsync(account, chainId, web3))
      return tx
    } catch (e) {
      return false
    }
  }, [account, dispatch, lpContract, masterChefContract, chainId, web3])

  return { onApprove: handleApprove }
}

