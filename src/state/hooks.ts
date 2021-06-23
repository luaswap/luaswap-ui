import { useEffect, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { BIG_ZERO } from 'utils/bigNumber'
import useWeb3 from 'hooks/useWeb3'
import useRefresh from 'hooks/useRefresh'
import { setDefaultFarmData, fetchFarms, setBlock } from './actions'
import { State, Farm, ProfileState, FarmsState, IdoState, BlockfolioState } from './types'
import { fetchProfile } from './profile'
import { fetchAllIdoData } from './ido'

export const useFetchPublicData = () => {
  const dispatch = useAppDispatch()
  const web3 = useWeb3()
  const { chainId } = useWeb3React()
  const { slowRefresh } = useRefresh()
  // useEffect(() => {
  //   const fetchPoolsPublicData = async () => {
  //     const blockNumber = await web3.eth.getBlockNumber()
  //     dispatch(fetchPoolsPublicDataAsync(blockNumber))
  //   }
  //   fetchPoolsPublicData()
  //   dispatch(fetchPoolsStakingLimitsAsync())
  // }, [dispatch, slowRefresh, web3])
  useEffect(() => {
    dispatch(setDefaultFarmData(chainId))
    dispatch(fetchFarms(chainId, web3))
  }, [chainId, dispatch, web3])

  useEffect(() => {
    const interval = setInterval(async () => {
      const blockNumber = await web3.eth.getBlockNumber()
      dispatch(setBlock(blockNumber))
    }, 6000)

    return () => clearInterval(interval)
  }, [dispatch, web3])
}

export const useFetchIdoData = () => {
  const dispatch = useAppDispatch()
  const web3 = useWeb3()
  const { chainId } = useWeb3React()

  useEffect(() => {
    dispatch(fetchAllIdoData(chainId, web3))
  }, [chainId, web3, dispatch])
}

// Farms

export const useFarms = (): FarmsState => {
  const farms = useSelector((state: State) => state.farms)
  return farms
}

export const useFarmFromPid = (pid): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.pid === pid))
  return farm
}

export const useFarmFromLpSymbol = (lpSymbol: string): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.lpSymbol === lpSymbol))
  return farm
}

export const useFarmUser = (pid) => {
  const farm = useFarmFromPid(pid)

  return {
    allowance: farm?.userData ? new BigNumber(farm.userData.allowance) : BIG_ZERO,
    tokenBalance: farm?.userData ? new BigNumber(farm.userData.tokenBalance) : BIG_ZERO,
    stakedBalance: farm?.userData ? new BigNumber(farm.userData.stakedBalance) : BIG_ZERO,
    earnings: farm?.userData ? new BigNumber(farm.userData.earnings) : BIG_ZERO,
  }
}

// IDO
export const useIdo = (): IdoState => {
  const idos = useSelector((state: State) => state.idos)

  return idos
}

// Profile

export const useFetchProfile = () => {
  const { account, chainId } = useWeb3React()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (chainId && account) {
      dispatch(fetchProfile(account, chainId))
    }
  }, [account, dispatch, chainId])
}

export const useProfile = () => {
  const { isInitialized, isLoading, data, isUnlock }: ProfileState = useSelector((state: State) => state.profile)
  return { profile: data, isUnlock, isInitialized, isLoading }
}

// Block
export const useBlock = () => {
  return useSelector((state: State) => state.block)
}

export const useInitialBlock = () => {
  return useSelector((state: State) => state.block.initialBlock)
}
// Blockfolio

export const useWallet = (): BlockfolioState => {
  return useSelector((state: State) => state.blockfolio)
}
// const walletByAdress = walletState.reduce((acc, curr) => {
//     return acc[curr.address]
//   }, {})