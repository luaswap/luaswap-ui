/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { BlockfolioState } from 'state/types'

const initialState: BlockfolioState = {
  isLoading: false,
  wallets: [],
}

export const blockfolioSlice = createSlice({
  name: 'blockfolio',
  initialState,
  reducers: {
    setWallet: (state, action) => {
      if (state.wallets.length > 0) {
        state.wallets.forEach((element, index) => {
          if (element.address !== action.payload.address) {
            state.wallets.push(action.payload)
          } else {
            state.wallets[index] = action.payload
          }
        })
      } else {
        state.wallets.push(action.payload)
      }
    },
    // setActive: (state, action){

    // }
  },
})
// // Actions
export const { setWallet } = blockfolioSlice.actions

export default blockfolioSlice.reducer
