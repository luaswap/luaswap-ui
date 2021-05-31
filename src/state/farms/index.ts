/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { allPools, tomoSupportedPools } from 'config/constants/farms'
import isArchivedPid from 'utils/farmHelpers'
import { IsTomoChain } from 'utils/wallet'
import axios from 'axios'
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
export const fetchFarms = (chainId: number) => async (dispatch, getState) => {
  const IsTomo = IsTomoChain(chainId)
  const apiUrl = IsTomo ? API_TOMO : API_ETH
  const { data } = await axios.get(`${apiUrl}/pools`)
  dispatch(setFarmsPublicData(data))
}
export const fetchFarmUserDataAsync = (account: string, chainId?: number) => async (dispatch, getState) => {
  const IsTomo = IsTomoChain(chainId)
  const farmsToFetch = IsTomo ? tomoSupportedPools : allPools
  // const userFarmAllowances = await fetchFarmUserAllowances(account, farmsToFetch)
  // const userFarmTokenBalances = await fetchFarmUserTokenBalances(account, farmsToFetch)
  const userStakedBalances = await fetchFarmUserStakedBalances(account, farmsToFetch, chainId)
  const userFarmEarnings = await fetchFarmUserEarnings(account, farmsToFetch, chainId)
  const arrayOfUserDataObjects = farmsToFetch.map((farm, index) => {
    return {
      pid: farm.pid,
      earnings: userFarmEarnings[index],
      stakedBalance: userStakedBalances[index],
    }
  })

  dispatch(setFarmUserData({ arrayOfUserDataObjects }))
}

export default farmsSlice.reducer
