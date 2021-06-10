import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state'
import useWeb3 from 'hooks/useWeb3'
import {
  fetchFarmUserDataAsync,
} from 'state/actions'
import { unstake } from 'utils/callHelpers'
import { useMasterchef } from './useContract'

const useUnstake = (pid: number) => {
  const dispatch = useAppDispatch()
  const { account, chainId } = useWeb3React()
  const web3 = useWeb3()
  const masterChefContract = useMasterchef(chainId)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account, chainId)
      dispatch(fetchFarmUserDataAsync(account, chainId, web3))
      console.info(txHash)
    },
    [account, dispatch, masterChefContract, pid, chainId, web3],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
