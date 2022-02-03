import axios from 'axios'

import {
  KinguinFilters,
  KinguinFiltersPartial,
  KinguinResponse
} from './kinguin'

const API_URL = process.env.REACT_APP_API as string

export async function fetchProducts(filters: KinguinFilters) {
  let params: KinguinFiltersPartial = {}
  
  for (const [name, value] of Object.entries(filters)) {
    if (!!value) {
      if (Array.isArray(value) && value.length) params[name] = value.join(',')
      else params[name] = value
    }
  }

<<<<<<< HEAD
  const { data }: { data: KinguinResponse } = await axios.get(API_URL + '/products', {
=======
  const { data }: { data: KinguinResponse } = await axios.get('http://localhost:8000/v1/products', {
>>>>>>> parent of b64c64c (fix: refactored API .env + added to handler)
    params: {
      limit: 24,
      sortBy: 'metacriticScore',
      sortType: 'desc',
      priceFrom: 0.99,
      ...params
    }
  })

  return data
}