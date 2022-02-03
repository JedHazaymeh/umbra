import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

// Import reducers
import settings from './slices/SettingSlice'
import products from './slices/ProductSlice'
import filters from './slices/FilterSlice'

// Combine reducers into root reducer
const features = combineReducers({ products, filters })

const reducer = combineReducers({ settings, features })

// Configure store with root reducer
const store = configureStore({ reducer })

// Export store to pass into provider component
export default store

// Infer the RootState, AppDispatch & AppThunk types from the store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>