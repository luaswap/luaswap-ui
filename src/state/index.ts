import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import farmsReducer from './farms'
import pricesReducer from './prices'
import profileReducer from './profile'
import blockReducer from './block'
import blockfolioReducer from './blockfolio'
import idosReducer from './ido'

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    block: blockReducer,
    farms: farmsReducer,
    prices: pricesReducer,
    profile: profileReducer,
    blockfolio: blockfolioReducer,
    idos: idosReducer,
  },
})

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
