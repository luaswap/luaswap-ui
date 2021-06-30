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
  isLoading: false,
  idos: [],
  openPools: [],
  currentPool: {},
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
      state.openPools = action.payload
    },
    setCurrentPool: (state, action) => {
      state.currentPool = action.payload
    },
    fetchIdoStats: (state) => {
      state.isLoading = true
    },
    fetchIdoEnds: (state) => {
      state.isLoading = false
    },
  },
})

// Actions
export const { setIdosData, setOpenPools, setCurrentPool, fetchIdoEnds, fetchIdoStats } = idosSlice.actions

export const fetchAllIdoData = (chainId: number, web3: Web3) => async (dispatch, getState) => {
  const idosInformation = await fetchIdosInformation(chainId, web3)
  dispatch(setIdosData(idosInformation))
}

export default idosSlice.reducer

// Thunks
export const fetchPools = () => async (dispatch, getState) => {
  try {
    dispatch(fetchIdoStats())
    const { data } = await axios.get(`https://api.luaswap.org/api/ido/pools/open`)
    dispatch(setOpenPools(data))
    dispatch(fetchIdoEnds())
  } catch (error) {
    dispatch(fetchIdoEnds())
  }
}

export const fetchPool = (id: string) => async (dispatch, getState) => {
  try {
    dispatch(fetchIdoStats())
    const { data } = await axios.get(`https://api.luaswap.org/api/ido/pools/detail/open/${id}`)
    dispatch(setCurrentPool(data))
    dispatch(fetchIdoEnds())
  } catch (error) {
    dispatch(fetchIdoEnds())
  }
}

// Selector
export const selectIdoState = (state) => state.idos
export const selectOpenPools = (state) => selectIdoState(state).openPools
export const selectLoadingStatus = (state) => selectIdoState(state).isLoading
export const selectCurrentPool = (state): Pool => selectIdoState(state).currentPool
export const selectPool = (index) => (state) => selectIdoState(state).openPools[index]
