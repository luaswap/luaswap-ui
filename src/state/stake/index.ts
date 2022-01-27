/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import type { AppDispatch } from 'state'
import { getUtcDateTimeString } from 'utils/formatTime'
import { getUserTokensLock } from './getStake'

const initialState = {
  isLoading: true,
  tokensLock: [],
  estTotalLua: 0,
  lockDuration: 0,
  tier: 0,
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
    setIsLoadingStake: (state, action) => {
      state.isLoading = action.payload
    },
    setLockDuration: (state, action) => {
      state.lockDuration = action.payload
    },
    setTier: (state, action) => {
      state.tier = action.payload
    },
  },
})

// Actions
export const { setTokensLock, setEstTotalLua, setIsLoadingStake, setLockDuration, setTier } = stakeSlice.actions

const titleNetwork = {
  '88': 'tomochain',
  '1': 'ethereum',
}

const idNetwork = {
  tomochain: 88,
  ethereum: 1,
}

const mapTokensLockData = (list, key) => {
  return list[key].map((token) => {
    return {
      ...token,
      quantity: token.quantity.toFixed(3),
      luaEstimate: token.luaEstimate.toFixed(3),
      unlockAtDate: getUtcDateTimeString(new Date(token.unlockAt).getTime(), 'MM/dd/yyyy', false),
      unlockAtTime: getUtcDateTimeString(new Date(token.unlockAt).getTime(), 'HH:mm', true),
      network: idNetwork[key],
    }
  })
}

export const getTokensLock = (account: string, chainId: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoadingStake(true))
    const { details, estLua, tier } = await getUserTokensLock(account)
    let firstPart = []
    let secondPart = []
    Object.keys(details).forEach((key) => {
      if (key === titleNetwork[chainId]) {
        firstPart = mapTokensLockData(details, key)
      } else {
        secondPart = mapTokensLockData(details, key)
      }
    })
    const dataTable = [...firstPart, ...secondPart]
    dispatch(setTokensLock(dataTable))
    dispatch(setEstTotalLua(estLua.toFixed(3)))
    dispatch(setIsLoadingStake(false))
    dispatch(setTier(tier))
  } catch (e) {
    console.log(e)
    dispatch(setIsLoadingStake(false))
  }
}

export default stakeSlice.reducer

// Selectors
export const selectTokensLock = (state) => state.stake.tokensLock
export const selectEstTotalLua = (state) => state.stake.estTotalLua
export const selectLockDuration = (state) => state.stake.lockDuration
export const selectIsLoadingStakeTable = (state) => state.stake.isLoading
export const selectTier = (state) => state.stake.tier
