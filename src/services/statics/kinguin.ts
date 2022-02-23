export type KinguinProduct = {
  kinguinId: number
  productId: string
  cheapestOfferId: string[]
  name: string
  originalName: string
  description: string
  developers: string[]
  publishers: string[]
  genres: string[]
  platform: string
  releaseDate: string
  qty: number
  price: number
  textQty: number
  offers: KinguinOffer[]
  offersCount: number
  totalQty: number
  isPreorder: boolean | undefined
  metacriticScore: number
  regionalLimitations: string
  regionId: number
  activationDetails: string
  videos: {
    name: string
    video_id: string
  }
  languages: string[]
  updatedAt: string
  systemRequirements: {
    system: string
    requirement: string[]
  }
  tags: string[]
  merchantName: string
  ageRating: string
  steam: string | undefined
  images: {
    screenshots: {
      url: string,
      thumbnail: string
    },
    cover: {
      url: string,
      thumbnail: string
    }
  }
}

export type KinguinOffer = {
  name: string
  offerId: string
  price: number
  qty: number
  textQty: number
  status: string
  isPreorder: boolean | undefined
  releaseDate: string
  merchantName: string
}

export type KinguinFilters = {
  [key: string]: number | string | string[] | boolean
  page: number
  limit: number
  name: string
  sortBy: string
  sortType: 'desc' | 'asc'
  priceFrom: number
  priceTo: number
  tags: string[]
  platform: string[]
  genre: string[]
  regionId: number
  languages: string[]
  isPreorder: boolean
  activePreorder: boolean
  updatedSince: string
  updatedTo: string
  withText: boolean
}

export type KinguinFiltersPartial = Partial<KinguinFilters>

export type KinguinResponse = {
  results: KinguinProduct[],
  item_count: number
}