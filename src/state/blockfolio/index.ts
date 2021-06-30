/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { BlockfolioState } from 'state/types'

const initialState: BlockfolioState = {
  isLoading: false,
  wallets: {},
}

export const blockfolioSlice = createSlice({
  name: 'blockfolio',
  initialState,
  reducers: {
    setWallet: (state, action) => {
      Object.keys(state.wallets).forEach(key => {
        if(key !== action.payload.address){
          state.wallets[key] = {
            ...state.wallets[key],
            isActive: false
          }
        }
      })
      state.wallets[action.payload.address] = action.payload
    },
    addWalletFromInput: (state, action) => {
      state.wallets[action.payload.address] = action.payload
    },
    setWalletActive: (state, action) => {
      Object.keys(state.wallets).forEach(key => {
        // active => false
        if(key !== action.payload){
          state.wallets[key] = {
            ...state.wallets[key],
            isActive: false
          }
        } else {
          // active => true
          state.wallets[action.payload] = {
            ...state.wallets[action.payload],
            isActive: true
          }
        }
      })      
    },
    resetWallet: (state, action) => {
      state.wallets = action.payload
    }
  },
})
// // Actions
export const { setWallet, addWalletFromInput, setWalletActive, resetWallet } = blockfolioSlice.actions

export default blockfolioSlice.reducer
