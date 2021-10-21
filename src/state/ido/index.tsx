/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { IdoDetail, IdoState, OpenPools } from 'state/types'
import { RootState } from 'state'
import { Pool } from 'views/Idos/types'
import { API_IDO_URL } from 'config'
import get from 'lodash/get'
// import { fetchIdosInformation } from './fetchIdosData'

const defaultCurrentPool = {
  id: null,
  img: null,
  name: null,
  description: null,
  openAt: null,
  closeAt: null,
  claimAt: null,
  status: null,
  projectDetail: null,
  links: [],
  socials: [],
  isPresent: false,
  snapshootAt: null,
  untilClaim: null,
  untilClose: null,
  untilOpen: null,
  untilSnapshootAt: null,
}

const initialState: IdoState = {
  isLoading: true,
  idos: [],
  openPools: {
    isLoading: true,
    data: {
      openingPools: [],
      upcomingPools: [],
    },
  },
  closedPools: {
    isLoading: true,
    data: [],
  },
  currentPool: {
    isLoading: true,
    data: defaultCurrentPool,
  },
}

export const idosSlice = createSlice({
  name: 'idos',
  initialState,
  reducers: {
    setIdosData: (state, action: PayloadAction<IdoDetail[]>) => {
      state.idos = action.payload
    },
    setOpenPools: (state, action: PayloadAction<Pool[]>) => {
      const upcomingPools = action.payload.filter((pool) => pool.status === 1)
      const openingPools = action.payload.filter((pool) => pool.status === 2)
      state.openPools.data.openingPools = openingPools
      state.openPools.data.upcomingPools = upcomingPools
    },
    setClosedPools: (state, action: PayloadAction<Pool[]>) => {
      state.closedPools.data = action.payload
    },
    setCurrentPool: (state, action: PayloadAction<Pool>) => {
      state.currentPool.data = action.payload
    },
    setDefaultCurrentPool: (state) => {
      state.currentPool.data = defaultCurrentPool
      state.currentPool.isLoading = true
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
    fetchClosedPoolsStarts: (state) => {
      state.closedPools.isLoading = true
    },
    fetchClosedPoolsEnds: (state) => {
      state.closedPools.isLoading = false
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
  fetchClosedPoolsEnds,
  fetchClosedPoolsStarts,
  setClosedPools,
  setDefaultCurrentPool,
} = idosSlice.actions

// export const fetchAllIdoData = (chainId: number, web3: Web3) => async (dispatch, getState) => {
//   const idosInformation = await fetchIdosInformation(chainId, web3)
//   dispatch(setIdosData(idosInformation))
// }

export default idosSlice.reducer

// Thunks
export const fetchPools = () => async (dispatch, getState) => {
  try {
    dispatch(fetchOpenPoolsStarts())
    dispatch(fetchClosedPoolsStarts())
    const openPoolsResponse = await axios.get(`${API_IDO_URL}/pools/open`)
    const openPools = get(openPoolsResponse, 'data', [])
    dispatch(setOpenPools(openPools))
    const closedPoolsResponse = await axios.get(`${API_IDO_URL}/pools/closed`)
    const closedPools = get(closedPoolsResponse, 'data', [])
    dispatch(setClosedPools(closedPools))
    dispatch(fetchClosedPoolsEnds())
    dispatch(fetchOpenPoolsEnds())
  } catch (error) {
    dispatch(fetchOpenPoolsEnds())
    dispatch(fetchClosedPoolsEnds())
  }
}

export const fetchOpenPools = () => async (dispatch, getState) => {
  try {
    dispatch(fetchOpenPoolsStarts())
    const openPoolsResponse = await axios.get(`${API_IDO_URL}/pools/open`)
    const openPools = get(openPoolsResponse, 'data', [])
    dispatch(setOpenPools(openPools))
    dispatch(fetchOpenPoolsEnds())
  } catch (error) {
    dispatch(fetchOpenPoolsEnds())
  }
}

export const fetchClosedPools = () => async (dispatch, getState) => {
  try {
    dispatch(fetchClosedPoolsStarts())
    const closedPoolsResponse = await axios.get(`${API_IDO_URL}/pools/closed`)
    const closedPools = get(closedPoolsResponse, 'data', [])
    dispatch(setClosedPools(closedPools))
    dispatch(fetchClosedPoolsEnds())
  } catch (error) {
    dispatch(fetchClosedPoolsEnds())
  }
}

export const fetchPool = (id: string, callback: () => void) => async (dispatch, getState) => {
  try {
    dispatch(fetchCurrentPoolStarts())
    const { data } = await axios.get(`${API_IDO_URL}/pools/detail/open/${id}`)
    dispatch(setCurrentPool(data))
    callback()
    dispatch(fetchCurrentPoolEnds())
  } catch (error) {
    callback()
    dispatch(fetchCurrentPoolEnds())
  }
}

// Selector
export const selectIdoState = (state: RootState): IdoState => state.idos
export const selectOpenPools = (state: RootState): OpenPools => selectIdoState(state).openPools.data
export const selectClosedPools = (state: RootState): Pool[] => selectIdoState(state).closedPools.data
export const selectLoadingStatus = (state: RootState): boolean => selectIdoState(state).isLoading
export const selectLoadingOpenPools = (state: RootState): boolean => selectIdoState(state).openPools.isLoading
export const selectLoadingClosedPools = (state: RootState): boolean => selectIdoState(state).closedPools.isLoading
export const selectLoadingCurrentPool = (state: RootState): boolean => selectIdoState(state).currentPool.isLoading
export const selectCurrentPool = (state: RootState): Pool => selectIdoState(state).currentPool.data
export const selectPool = (index: number) => (state: RootState) => selectIdoState(state).openPools[index]
