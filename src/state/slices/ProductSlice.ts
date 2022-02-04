// External imports
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// Local imports
import log from '../../utils/logger'

// API types + fetch function
import { fetchProducts } from '../../api/productsHandler'

import {
  KinguinProduct,
  KinguinFilters
} from '../../api/kinguin'

// State
export type ProductState = {
  status: 'idle' | 'loading' | 'error'
  data: KinguinProduct[]
  count: number
}

const initialState = {
  status: 'idle',
  data: [],
  count: 0
} as ProductState

// Slice
export const ProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<ProductState['status']>) => {
      log('darkgreen', 'Action: products/setStatus')
      state.status = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(searchProducts.pending, (state) => {
      state.status = 'loading'
    })
    .addCase(searchProducts.fulfilled, (state, action) => {
      state.status = 'idle'
      state.data = action.payload.results
      state.count = action.payload.item_count
    })
    .addCase(searchProducts.rejected, (state) => {
      state.status = 'error'
    })
  }
})

export const searchProducts = createAsyncThunk(
  'api/fetchProducts',
  async (filters: KinguinFilters) => {
    log('darkgreen', 'Action: products/searchProducts')
    const data = await fetchProducts(filters)

    return data
  }
)

export default ProductSlice.reducer