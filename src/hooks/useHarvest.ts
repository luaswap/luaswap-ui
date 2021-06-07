import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state'
import useWeb3 from 'hooks/useWeb3'
import { fetchFarmUserDataAsync, updateUserBalance, updateUserPendingReward } from 'state/actions'
import { soushHarvest, soushHarvestBnb, harvest } from 'utils/callHelpers'
import { useMasterchef, useSousChef } from './useContract'

export const useHarvest = (farmPid: number) => {
  const dispatch = useAppDispatch()
  const { account, chainId } = useWeb3React()
  const web3 = useWeb3()
  const masterChefContract = useMasterchef(chainId)

  const handleHarvest = useCallback(async () => {
    const txHash = await harvest(masterChefContract, farmPid, account, chainId)
    dispatch(fetchFarmUserDataAsync(account, chainId, web3))
    return txHash
  }, [account, dispatch, farmPid, masterChefContract, chainId, web3])

  return { onReward: handleHarvest }
}

export const useSousHarvest = (sousId, isUsingBnb = false) => {
  const dispatch = useAppDispatch()
  const { account, chainId } = useWeb3React()
  const sousChefContract = useSousChef(sousId)
  const masterChefContract = useMasterchef(chainId)

  const handleHarvest = useCallback(async () => {
    if (sousId === 0) {
      await harvest(masterChefContract, 0, account, chainId)
    } else if (isUsingBnb) {
      await soushHarvestBnb(sousChefContract, account)
    } else {
      await soushHarvest(sousChefContract, account)
    }
    dispatch(updateUserPendingReward(sousId, account))
    dispatch(updateUserBalance(sousId, account))
  }, [account, dispatch, isUsingBnb, masterChefContract, sousChefContract, sousId, chainId])

  return { onReward: handleHarvest }
}
