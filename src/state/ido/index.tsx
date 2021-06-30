/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import Web3 from 'web3'
import axios from 'axios'
import { IsTomoChain } from 'utils/wallet'
import { IdoState } from 'state/types'
import { API_ETH, API_TOMO } from 'config'
import { Pool } from 'views/Idos/types'
import { fetchIdosInformation } from './fetchIdosData'

const initialState: IdoState = {
  isLoading: true,
  idos: [],
  openPools: {
    isLoading: true,
    data: [],
  },
  currentPool: {
    isLoading: true,
    data: {},
  },
}

interface CallBackFunction {
  onSuccess: () => void
  onError: () => void
}

export const idosSlice = createSlice({
  name: 'idos',
  initialState,
  reducers: {
    setIdosData: (state, action) => {
      state.idos = action.payload
    },
    setOpenPools: (state, action) => {
      state.openPools.data = action.payload
    },
    setCurrentPool: (state, action) => {
      state.currentPool.data = action.payload
    },
    fetchIdoStats: (state) => {
      state.isLoading = true
    },
    fetchIdoEnds: (state) => {
      state.isLoading = false
    },
    fetchOpenPoolsStarts: (state) => {
      state.openPools.isLoading = true
    },
    fetchOpenPoolsEnds: (state) => {
      state.openPools.isLoading = false
    },
    fetchCurrentPoolStarts: (state) => {
      state.currentPool.isLoading = true
    },
    fetchCurrentPoolEnds: (state) => {
      state.currentPool.isLoading = false
    },
  },
})

// Actions
export const {
  setIdosData,
  setOpenPools,
  setCurrentPool,
  fetchIdoEnds,
  fetchIdoStats,
  fetchCurrentPoolStarts,
  fetchCurrentPoolEnds,
  fetchOpenPoolsEnds,
  fetchOpenPoolsStarts,
} = idosSlice.actions

export const fetchAllIdoData = (chainId: number, web3: Web3) => async (dispatch, getState) => {
  const idosInformation = await fetchIdosInformation(chainId, web3)
  dispatch(setIdosData(idosInformation))
}

export default idosSlice.reducer

// Thunks
export const fetchPools = () => async (dispatch, getState) => {
  try {
    dispatch(fetchOpenPoolsStarts())
    const { data } = await axios.get(`https://api.luaswap.org/api/ido/pools/open`)
    dispatch(setOpenPools(data))
    dispatch(fetchOpenPoolsEnds())
  } catch (error) {
    dispatch(fetchOpenPoolsEnds())
  }
}

export const fetchPool = (id: string) => async (dispatch, getState) => {
  try {
    dispatch(fetchCurrentPoolStarts())
    const { data } = await axios.get(`https://api.luaswap.org/api/ido/pools/detail/open/${id}`)
    dispatch(setCurrentPool(data))
    dispatch(fetchCurrentPoolEnds())
  } catch (error) {
    dispatch(fetchCurrentPoolEnds())
  }
}

// Selector
export const selectIdoState = (state) => state.idos
export const selectOpenPools = (state) => selectIdoState(state).openPools.data
export const selectLoadingStatus = (state) => selectIdoState(state).isLoading
export const selectLoadingOpenPools = (state) => selectIdoState(state).openPools.isLoading
export const selectLoadingCurrentPool = (state) => selectIdoState(state).currentPool.isLoading
export const selectCurrentPool = (state): Pool => selectIdoState(state).currentPool.data
export const selectPool = (index) => (state) => selectIdoState(state).openPools[index]
