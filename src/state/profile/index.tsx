/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProfileState, Profile } from 'state/types'
import type { AppDispatch } from 'state'
import getProfile, { getTierData } from './getProfile'

const initialState: ProfileState = {
  isInitialized: false,
  isLoading: true,
  isUnlock: false,
  data: {
    luaUnlockAble: '0',
    totalLuaLock: '0',
    userTier: null,
  },
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    profileFetchStart: (state) => {
      state.isLoading = true
    },
    profileFetchSucceeded: (_state, action) => {
      const { totalLuaLock, luaUnlockAble, tier } = action.payload
      _state.isLoading = false
      _state.data = {
        totalLuaLock,
        luaUnlockAble,
        userTier: tier,
      }
    },
    profileTierFetchSucceeded: (_state, action) => {
      const tier = action.payload
      _state.isLoading = false
      _state.data = {
        ..._state.data,
        userTier: tier,
      }
    },
    profileFetchFailed: (state) => {
      state.isLoading = false
      state.isInitialized = true
    },
    profileClear: () => ({
      ...initialState,
      isLoading: false,
    }),
    unlockLuaStatus: (state, action) => {
      state.isUnlock = action.payload
    },
  },
})

// Actions
export const {
  profileFetchStart,
  profileFetchSucceeded,
  profileFetchFailed,
  profileTierFetchSucceeded,
  profileClear,
  unlockLuaStatus,
} = profileSlice.actions

// Thunks
// TODO: this should be an AsyncThunk
export const fetchProfile = (address: string, chainId: number, account: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(profileFetchStart())
    const tierResponse = await getTierData(account)
    dispatch(profileTierFetchSucceeded(tierResponse))
    const response = await getProfile(address, chainId, account)
    dispatch(profileFetchSucceeded(response))
  } catch (error) {
    dispatch(profileFetchFailed())
  }
}

export default profileSlice.reducer

// Selectors
export const selectUserData = (state) => state.profile.data
export const selectUserTier = (state) => selectUserData(state).userTier
