/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppDispatch } from 'state'
import { IdoState } from 'state/types'

const initialState: IdoState = {
  idos: [],
}

export const idosSlice = createSlice({
  name: 'idos',
  initialState,
  reducers: {

  },
})

// // Actions
// export const { profileFetchStart, profileFetchSucceeded, profileFetchFailed, profileClear, unlockLuaStatus } =
//   idosSlice.actions

export default idosSlice.reducer
