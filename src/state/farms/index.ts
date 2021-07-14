/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Web3 from 'web3'
import getNewRewardPerBlock from 'hooks/useNewRewards'
import { allPools, tomoSupportedPools } from 'config/constants/farms'
import isArchivedPid from 'utils/farmHelpers'
import { IsTomoChain } from 'utils/wallet'
import { API_ETH, API_TOMO } from 'config'
import {
  fetchFarmUserEarnings,
  fetchFarmUserAllowances,
  fetchFarmUserTokenBalances,
  fetchFarmUserStakedBalances,
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
  },
}))

const allTomoSupportedPools = tomoSupportedPools.map((farm) => ({
  ...farm,
  userData: {
    allowance: '0',
    tokenBalance: '0',
    stakedBalance: '0',
    earnings: '0',
  },
}))
const initialState: FarmsState = { data: allPoolConfig, userDataLoaded: false }
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
      state.data = state.data.map((farm) => {
        const liveFarmData = liveFarmsData.find((f) => f.pid === farm.pid)
        return { ...farm, ...liveFarmData }
      })
    },
    setFarmUserData: (state, action) => {
      const { arrayOfUserDataObjects } = action.payload
      arrayOfUserDataObjects.forEach((userDataEl) => {
        const { pid } = userDataEl
        const index = state.data.findIndex((farm) => farm.pid === pid)
        state.data[index] = { ...state.data[index], userData: userDataEl }
      })
      state.userDataLoaded = true
    },
  },
})

// Actions
export const { setFarmUserData, setFarmsPublicData, setDefaultFarmData } = farmsSlice.actions

// Thunks
export const fetchFarms = (chainId: number, web3: Web3) => async (dispatch, getState) => {
  const IsTomo = IsTomoChain(chainId)
  const apiUrl = IsTomo ? API_TOMO : API_ETH
  const { data } = await axios.get(`${apiUrl}/pools`)
  dispatch(setFarmsPublicData(data))
  const apyListResponse = data.map((farm) => {
    return getNewRewardPerBlock(web3, farm.pid + 1, chainId)
  })
  const apyList = await Promise.all(apyListResponse)
  dispatch(setFarmsPublicData(apyList))
}
export const fetchFarmUserDataAsync =
  (account: string, chainId?: number, web3?: Web3) => async (dispatch, getState) => {
    try {
      const IsTomo = IsTomoChain(chainId)
      const farmsToFetch = IsTomo ? tomoSupportedPools : allPools
      const userFarmTokenBalances = await fetchFarmUserTokenBalances(account, farmsToFetch, chainId, web3)
      const userFarmAllowances = await fetchFarmUserAllowances(account, farmsToFetch, chainId, web3)
      const userStakedBalances = await fetchFarmUserStakedBalances(account, farmsToFetch, chainId, web3)
      const userFarmEarnings = await fetchFarmUserEarnings(account, farmsToFetch, chainId, web3)
      const arrayOfUserDataObjects = farmsToFetch.map((farm, index) => {
        return {
          pid: farm.pid,
          earnings: userFarmEarnings[index],
          stakedBalance: userStakedBalances[index],
          allowance: userFarmAllowances[index],
          tokenBalance: userFarmTokenBalances[index],
        }
      })

      dispatch(setFarmUserData({ arrayOfUserDataObjects }))
    } catch (error) {
      console.log(error, 'fetch farm data fail')
    }
  }

export default farmsSlice.reducer
