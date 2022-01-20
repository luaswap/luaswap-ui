/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import type { AppDispatch } from 'state'
import { getNFTPoolDetail, getNFTPools } from './getNfts'

const initialState = {
  isLoading: false,
  nftPools: [],
  isLoadingNFTDetail: false,
  selectedNFTPool: null,
}

export const NFTPoolsSlice = createSlice({
  name: 'nftPools',
  initialState,
  reducers: {
    setNFTPools: (state, action) => {
      state.nftPools = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setSelectedNFTPool: (state, action) => {
      state.selectedNFTPool = action.payload
    },
    setIsLoadingNFTDetail: (state, action) => {
      state.isLoadingNFTDetail = action.payload
    },
  },
})

// Actions
export const { setNFTPools, setIsLoading, setSelectedNFTPool, setIsLoadingNFTDetail } = NFTPoolsSlice.actions

export const fetchNFTPools = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true))
    const data = await getNFTPools()
    dispatch(setNFTPools(data))
    dispatch(setIsLoading(false))
  } catch (e) {
    console.log(e)
    dispatch(setIsLoading(false))
  }
}

export const fetchNFTPoolDetail = (NFTPoolId) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoadingNFTDetail(true))
    const data = await getNFTPoolDetail(NFTPoolId)
    dispatch(setSelectedNFTPool(data))
    dispatch(setIsLoadingNFTDetail(false))
  } catch (e) {
    console.log(e)
    dispatch(setIsLoadingNFTDetail(false))
  }
}

export default NFTPoolsSlice.reducer

// Selectors
export const selectNFTPools = (state) => state.nftPools.nftPools
export const selectIsLoadingNFTPools = (state) => state.nftPools.isLoading
export const selectSelectedNFTPool = (state) => state.nftPools.selectedNFTPool
export const selectIsLoadingNFTDetail = (state) => state.nftPools.isLoadingNFTDetail
