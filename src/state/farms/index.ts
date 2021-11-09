/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Web3 from 'web3'
import getNewRewardPerBlock from 'hooks/useNewRewards'
import getNewRewardPerBlockDual from 'hooks/useNewRewardsDual'
import { allPools, tomoSupportedPools } from 'config/constants/farms'
import isArchivedPid from 'utils/farmHelpers'
import { IsTomoChain } from 'utils/wallet'
import { API_ETH, API_TOMO } from 'config'
import { FarmConfig } from 'config/constants/types'
import { RootState } from 'state'
import {
  fetchFarmUserEarnings,
  fetchFarmUserAllowances,
  fetchFarmUserTokenBalances,
  fetchFarmUserStakedBalances,
  fetchFarmUserEarningsLua,
} from './fetchFarmUser'
import { FarmsState, Farm } from '../types'

const nonArchivedFarms = allPools.filter(({ pid }) => !isArchivedPid(pid))

const allPoolConfig = allPools.map((farm) => ({
  ...farm,
  userData: {
    allowance: '0',
    tokenBalance: '0',
    stakedBalance: '0',
    earnings: '0',
    earningsLua: '0',
  },
}))

const allTomoSupportedPools = tomoSupportedPools.map((farm) => ({
  ...farm,
  userData: {
    allowance: '0',
    tokenBalance: '0',
    stakedBalance: '0',
    earnings: '0',
    earningsLua: '0',
  },
}))
const initialState: FarmsState = { data: allPoolConfig, userDataLoaded: false, farmDataLoaded: false }
export const farmsSlice = createSlice({
  name: 'Farms',
  initialState,
  reducers: {
    setDefaultFarmData: (state, action) => {
      const chainId = action.payload
      const IsTomo = IsTomoChain(chainId)
      if (IsTomo) {
        state.data = allTomoSupportedPools
      } else {
        state.data = allPoolConfig
      }
    },
    setFarmsPublicData: (state, action) => {
      const liveFarmsData: Farm[] = action.payload
      const data = state.data.length === 0 ? liveFarmsData : state.data
      state.data = data.map((farm) => {
        const liveFarmData = liveFarmsData.find(
          (f) => f.pid === farm.pid && (f.master || '').toLowerCase() === (farm.master || '').toLowerCase(),
        )
        return { ...farm, ...liveFarmData }
      })
      state.farmDataLoaded = true
    },
    setFarmUserData: (state, action) => {
      const { arrayOfUserDataObjects } = action.payload
      arrayOfUserDataObjects.forEach((userDataEl) => {
        const { pid } = userDataEl
        const index = state.data.findIndex(
          (farm) => farm.pid === pid && (userDataEl.master || '').toLowerCase() === (farm.master || '').toLowerCase(),
        )
        state.data[index] = { ...state.data[index], userData: userDataEl }
      })
      state.userDataLoaded = true
    },
  },
})

// Actions
export const { setFarmUserData, setFarmsPublicData, setDefaultFarmData } = farmsSlice.actions

// Thunks
export const fetchFarms =
  (chainId: number, web3: Web3, isDual: boolean, callback?: () => void) => async (dispatch, getState) => {
    try {
      const IsTomo = IsTomoChain(chainId)
      const apiUrl = IsTomo ? API_TOMO : API_ETH
      const finalUrl = isDual ? `${apiUrl}/dualfarm` : apiUrl
      const { data } = await axios.get(`${finalUrl}/pools`)
      dispatch(setFarmsPublicData(data))
      const apyListResponse = data.map((farm) => {
        if (isDual) return getNewRewardPerBlockDual(web3, farm.pid + 1, chainId, farm.master)
        return getNewRewardPerBlock(web3, farm.pid + 1, chainId)
      })
      const apyList = await Promise.all(apyListResponse)
      dispatch(setFarmsPublicData(apyList))
      callback()
    } catch (error) {
      console.log(error, 'fail to fetch farm info')
      callback()
    }
  }
export const fetchFarmUserDataAsync =
  (account: string, chainId?: number, web3?: Web3, pools?: FarmConfig[]) => async (dispatch, getState) => {
    try {
      const IsTomo = IsTomoChain(chainId)
      const farmsToFetch = pools || (IsTomo ? tomoSupportedPools : allPools)
      const userFarmTokenBalances = await fetchFarmUserTokenBalances(
        '0xA5b9e906cd4D76c99b6ad4db1D35e9a8C95d9E0E',
        farmsToFetch,
        chainId,
        web3,
      )
      const userFarmAllowances = await fetchFarmUserAllowances(
        '0xA5b9e906cd4D76c99b6ad4db1D35e9a8C95d9E0E',
        farmsToFetch,
        chainId,
        web3,
      )
      const userStakedBalances = await fetchFarmUserStakedBalances(
        '0xA5b9e906cd4D76c99b6ad4db1D35e9a8C95d9E0E',
        farmsToFetch,
        chainId,
        web3,
      )
      const userFarmEarnings = await fetchFarmUserEarnings(
        '0xA5b9e906cd4D76c99b6ad4db1D35e9a8C95d9E0E',
        farmsToFetch,
        chainId,
        web3,
      )
      const userFarmEarningsLua = await fetchFarmUserEarningsLua(
        '0xA5b9e906cd4D76c99b6ad4db1D35e9a8C95d9E0E',
        farmsToFetch,
        chainId,
        web3,
      )
      const arrayOfUserDataObjects = farmsToFetch.map((farm, index) => {
        return {
          master: farm.master,
          pid: farm.pid,
          earnings: userFarmEarnings[index],
          stakedBalance: userStakedBalances[index],
          allowance: userFarmAllowances[index],
          tokenBalance: userFarmTokenBalances[index],
          earningsLua: userFarmEarningsLua[index],
        }
      })
      dispatch(setFarmUserData({ arrayOfUserDataObjects }))
    } catch (error) {
      console.log(error, 'fetch farm data fail')
    }
  }

export default farmsSlice.reducer

// Selector
export const selectFarmState = (state: RootState) => state.farms
