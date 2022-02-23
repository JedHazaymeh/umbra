// External imports
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Local imports
import log from '../../utils/logger'

// API types
import {
  KinguinFilters
} from '../../services/statics/kinguin'

// State
export type FilterState = {
  [key: string]: KinguinFilters
  products: KinguinFilters
}

const initialState = {
  products: {
    page: 1,
    limit: 24,
    name: '',
    sortBy: 'metacriticScore',
    sortType: 'desc',
    priceFrom: 0,
    priceTo: 0,
    tags: [],
    platform: [],
    genre: [],
    regionId: 0,
    languages: [],
    isPreorder: false,
    activePreorder: false,
    updatedSince: '',
    updatedTo: '',
    withText: false
  }
} as FilterState

// Slice
export const FilterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<KinguinFilters>) => {
      log('darkgreen', 'Action: filters/setFilters')
      state.products = action.payload
    },
    toggleListFilter: (state, action: PayloadAction<{ name: string, filter: string }>) => {
      log('darkgreen', 'Action: filters/toggleFilter')

      let list = state.products[action.payload.name]
      if (Array.isArray(list)) {
        const index = list.indexOf(action.payload.filter)

        if (index === -1) list.push(action.payload.filter)
        else list.splice(index, 1)
      }
    },
    setFilterLimit: (state, action: PayloadAction<number>) => {
      log('darkgreen', 'Action: filters/setFilterLimit')
      state.products.limit = action.payload
    },
    setFilterPage: (state, action: PayloadAction<number>) => {
      log('darkgreen', 'Action: filters/setFilterPage')
      state.products.page = action.payload
    },
    setFilterName: (state, action: PayloadAction<string>) => {
      log('darkgreen', 'Action: filters/setFilterName')
      state.products.name = action.payload
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      log('darkgreen', 'Action: filters/setSortBy')
      state.products.sortBy = action.payload
    },
    toggleSortType: (state) => {
      log('darkgreen', 'Action: filters/toggleSortType')
      state.products.sortType = (state.products.sortType === 'desc' ? 'asc' : 'desc')
    }
  }
})

export const {
  setFilters,
  toggleListFilter,
  setFilterLimit,
  setFilterPage,
  setFilterName,
  setSortBy,
  toggleSortType
} = FilterSlice.actions

export default FilterSlice.reducer