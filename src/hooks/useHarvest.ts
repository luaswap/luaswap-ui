import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state'
import useWeb3 from 'hooks/useWeb3'
import { fetchFarmUserDataAsync } from 'state/actions'
import { harvest } from 'utils/callHelpers'
import { useMasterchef } from './useContract'

// eslint-disable-next-line import/prefer-default-export
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
