/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import Web3 from 'web3'
import axios from 'axios'
import { IsTomoChain } from 'utils/wallet'
import { IdoState } from 'state/types'
import { API_ETH, API_TOMO } from 'config'
import { fetchIdosInformation } from './fetchIdosData'

const initialState: IdoState = {
  isLoading: false,
  idos: [],
  openPools: [],
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
  },
})

// Actions
export const { setIdosData, setOpenPools } = idosSlice.actions

export const fetchAllIdoData = (chainId: number, web3: Web3) => async (dispatch, getState) => {
  const idosInformation = await fetchIdosInformation(chainId, web3)
  dispatch(setIdosData(idosInformation))
}

export default idosSlice.reducer

// Thunks
export const fetchPools =
  ({ onSuccess, onError }: CallBackFunction) =>
  async (dispatch, getState) => {
    try {
      const { data } = await axios.get(`https://api.luaswap.org/api/ido/pools/open`)
      dispatch(setOpenPools(data))
      onSuccess()
    } catch (error) {
      onError()
    }
  }

// Selector
export const selectOpenPools = (state) => state.idos.openPools
export const selectPool = (index) => (state) => state.idos.openPools[index]
