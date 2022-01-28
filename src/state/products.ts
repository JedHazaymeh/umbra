// External imports
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// Local imports
import log from '../utils/logger'

// Types
type Product = {
  id: number
  name: string
  image: string
  price: number
  platform: string
  genres: string[]
  tags: string[]
  region: string
  isPreorder: boolean | undefined
}

// State logic

export const initialState = {
  products: [] as Product[],
  loading: true,
  error: true
}

const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProducts: (state) => {
      state.loading = true
    },
    getProductsSuccess: (state, { payload }) => {
      state.products = payload
      state.loading = false
      state.error = false
    },
    getProductsFailure: (state) => {
      state.loading = false
      state.error = true
    }
  }
})

export const actions = slice.actions

export default slice.reducer

export function fetchProducts() {
  return async (dispatch: any) => {
    log('darkgreen', 'Action: FetchProducts')
    dispatch(actions.getProducts())

    try {
      const { data } = await axios.get('http://localhost:5000/products', {
        params: {
          limit: 20
        }
      })

      dispatch(actions.getProductsSuccess(data))
    } catch (error) {
      dispatch(actions.getProductsFailure())
    }
  }
}