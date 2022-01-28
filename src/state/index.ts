import { combineReducers } from 'redux'

// Import reducers from states
import products from './products'

// Combine reducers into root reducer
const reducers = { products }
const rootReducer = combineReducers(reducers)

export default rootReducer