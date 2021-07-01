import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { useDispatch } from 'react-redux'
import { persistStore, persistReducer, PERSIST } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import farmsReducer from './farms'
import pricesReducer from './prices'
import profileReducer from './profile'
import blockReducer from './block'
import blockfolioReducer from './blockfolio'
import idosReducer from './ido'

const blockfolioConfig = {
  key: 'blockfolio',
  storage,
}
const reducer = combineReducers({
  block: blockReducer,
  farms: farmsReducer,
  prices: pricesReducer,
  profile: profileReducer,
  blockfolio: persistReducer(blockfolioConfig, blockfolioReducer),
  idos: idosReducer,
})

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [PERSIST],
    },
  }),
})

export const persistor = persistStore(store)

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
