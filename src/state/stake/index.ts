/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import type { AppDispatch } from 'state'
import { formatDateTime } from 'utils/formatTime'
import { getUserTokensLock } from './getStake'

const initialState = {
  isLoading: true,
  tokensLock: [],
  estTotalLua: 0,
  lockDuration: 0,
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
    setLockDuration: (state, action) => {
      state.lockDuration = action.payload
    },
  },
})

// Actions
export const { setTokensLock, setEstTotalLua, setIsLoading, setLockDuration } = stakeSlice.actions

export const getTokensLock = (account: string, chainId: number) => async (dispatch: AppDispatch) => {
  const titleNetwork = {
    '88': 'tomochain',
    '1': 'ethereum',
  }
  try {
    dispatch(setIsLoading(true))
    const { details, estLua } = await getUserTokensLock(account)
    dispatch(
      setTokensLock(
        details[titleNetwork[chainId]].map((token) => {
          return {
            ...token,
            quantity: token.quantity.toFixed(3),
            luaEstimate: token.luaEstimate.toFixed(3),
            unlockAt: formatDateTime(new Date(token.unlockAt).getTime(), 'MM/dd/yyyy HH:mm:ss'),
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
export const selectLockDuration = (state) => state.stake.lockDuration
export const selectIsLoadingStakeTable = (state) => state.stake.isLoading
