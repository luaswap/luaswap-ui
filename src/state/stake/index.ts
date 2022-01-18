/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import type { AppDispatch } from 'state'
import { getUtcDateString } from 'utils/formatTime'
import { getUserTokensLock } from './getStake'
// const [tokensLock, setTokenLock] = useState([])
//   const [estTotalLua, setEstTotalLua] = useState(0)

const initialState = {
  isLoading: true,
  tokensLock: [],
  estTotalLua: 0,
}

export const stakeSlice = createSlice({
  name: 'Stake',
  initialState,
  reducers: {
    setTokensLock: (state, action) => {
      state.tokensLock = action.payload
    },
    setEstTotalLua: (state, action) => {
      state.estTotalLua = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
})

// Actions
export const { setTokensLock, setEstTotalLua, setIsLoading } = stakeSlice.actions

export const getTokensLock = (account: string, chainId: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true))
    const { details, estLua } = await getUserTokensLock(account)
    dispatch(
      setTokensLock(
        details.tomochain.map((token) => {
          return {
            ...token,
            quantity: token.quantity.toFixed(3),
            luaEstimate: token.luaEstimate.toFixed(3),
            unlockAt: getUtcDateString(token.unlockAt),
          }
        }),
      ),
    )
    dispatch(setEstTotalLua(estLua.toFixed(3)))
    dispatch(setIsLoading(false))
  } catch (e) {
    console.log(e)
    dispatch(setIsLoading(false))
  }
}

export default stakeSlice.reducer

// Selectors
export const selectTokensLock = (state) => state.stake.tokensLock
export const selectEstTotalLua = (state) => state.stake.estTotalLua
