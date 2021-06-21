/* eslint-disable no-param-reassign */
import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BlockfolioState } from 'state/types'

const initialState: BlockfolioState = {
  isLoading: false,
  wallets: [],
}
// Thunks
// export const fetchBlockfolio = createAsyncThunk(
//     'blockfolio/fetch',
//     async (address: string) => {
//         const tomoBalance = axios.post(`${'http://localhost:8020/tomochain/balancetoken/'}${address}`)
//         const tomoLiquidity = axios.post(`${'http://localhost:8020/tomochain/luaswapliquidity/'}${address}`)
//         const tomoLuasafe = axios.post(`${'http://localhost:8020/tomochain/luasafe/'}${address}`)
//         const ethBalance = axios.post(`${'http://localhost:8020/ethereum/balancetoken/'}${address}`)
//         const ethLiquidity = axios.post(`${'http://localhost:8020/ethereum/luaswapliquidity/'}${address}`)
//         const ethLuasafe = axios.post(`${'http://localhost:8020/ethereum/luasafe/'}${address}`)

//         const result = await response.json()
//         // Return normalized token names
//         console.log(result)
//         return {
//             data: result
//         }
//     })

export const blockfolioSlice = createSlice({
  name: 'blockfolio',
  initialState,
  reducers: {
    setWallet: (state, action) => {
      state.wallets = action.payload
    },
  },
  // extraReducers: (builder) => {
  //     builder.addCase(fetchBlockfolio.pending, (state) => {
  //         state.isLoading = true
  //     })
  //     builder.addCase(fetchBlockfolio.fulfilled, (state, action) => {
  //         state.isLoading = false
  //         state.data = action.payload.data
  //     })
  // },
})

export default blockfolioSlice.reducer
