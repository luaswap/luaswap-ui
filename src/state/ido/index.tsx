/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import Web3 from 'web3'
import { IdoState } from 'state/types'
import { fetchIdosInformation } from './fetchIdosData'

const initialState: IdoState = {
  isLoading: false,
  idos: [],
}

export const idosSlice = createSlice({
  name: 'idos',
  initialState,
  reducers: {
    setIdosData: (state, action) => {
      state.idos = action.payload
    },
  },
})

// // Actions
export const { setIdosData } =
  idosSlice.actions

export const fetchAllIdoData = (chainId: number, web3: Web3) => async (dispatch, getState) => {
  const idosInformation = await fetchIdosInformation(chainId, web3)
  dispatch(setIdosData(idosInformation))
}

export default idosSlice.reducer
