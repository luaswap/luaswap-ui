/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProfileState, Profile } from 'state/types'
import type { AppDispatch } from 'state'
import getProfile from './getProfile'

const initialState: ProfileState = {
  isInitialized: false,
  isLoading: true,
  isUnlock: false,
  data: {
    luaUnlockAble: '0',
    totalLuaLock: '0',
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
      const { totalLuaLock, luaUnlockAble } = action.payload
      _state.isLoading = false
      _state.data = {
        totalLuaLock,
        luaUnlockAble,
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
    }
  },
})

// Actions
export const { profileFetchStart, profileFetchSucceeded, profileFetchFailed, profileClear, unlockLuaStatus } =
  profileSlice.actions

// Thunks
// TODO: this should be an AsyncThunk
export const fetchProfile = (address: string, chainId: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(profileFetchStart())
    const response = await getProfile(address, chainId)
    dispatch(profileFetchSucceeded(response))
  } catch (error) {
    dispatch(profileFetchFailed())
  }
}

export default profileSlice.reducer
