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
      // console.log(Object.keys(state.wallets))
      Object.keys(state.wallets).forEach(key => {
        // console.log(key)
        state.wallets[key] = {
          ...state.wallets[key],
          isActive: false
        }
      })
      console.log(Object.values(state.wallets))
      state.wallets[action.payload.address] = action.payload
    },
    addWalletFromInput: (state, action) => {
      state.wallets[action.payload.address] = action.payload
    },
    setWalletActive: (state, action) => {
      Object.keys(state.wallets).forEach(key => {
        console.log(key !== action.payload)
        if(key !== action.payload){
          state.wallets[key] = {
            ...state.wallets[key],
            isActive: false
          }
        } else {
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
