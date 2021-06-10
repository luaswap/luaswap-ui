import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state'
import useWeb3 from 'hooks/useWeb3'
import { fetchFarmUserDataAsync } from 'state/actions'
import { stake } from 'utils/callHelpers'
import { useMasterchef } from './useContract'

const useStake = (pid: number) => {
  const dispatch = useAppDispatch()
  const { account, chainId } = useWeb3React()
  const web3 = useWeb3()
  const masterChefContract = useMasterchef(chainId)

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(masterChefContract, pid, amount, account, chainId)
      dispatch(fetchFarmUserDataAsync(account, chainId, web3))
      console.info(txHash)
    },
    [account, dispatch, masterChefContract, pid, chainId, web3],
  )

  return { onStake: handleStake }
}

export default useStake