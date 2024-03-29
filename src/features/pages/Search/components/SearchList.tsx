import { useAppDispatch, useAppSelector } from "../../../../state/hooks"
import { useEffect, useMemo } from "react"
import { shallowEqual } from "react-redux"

import log from "../../../../utils/logger"

import { setFilterPage, setSortBy, toggleSortType } from "../../../../state/slices/filters.slice"
import { searchProducts, setStatus } from "../../../../state/slices/products.slice"
import Product from "../../../common/Product/Product"

import {
  Box,
  Grid,
  Toolbar,
  CircularProgress,
  Pagination,
  Typography,
  Select,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton
} from "@mui/material"

import {
  ArrowDropDown,
  ArrowDropUp,
  ErrorOutline,
  Sort
} from '@mui/icons-material'

export default function SearchList() {
  const filters = useAppSelector((state) => state.features.filters.products)
  const results = useAppSelector((state) => state.features.products.count)
  const pages = useMemo(() => Math.floor(results / filters.limit), [results, filters.limit])

  const dispatch = useAppDispatch()

  // search products with current filters
  useEffect(() => {
    dispatch(searchProducts(filters))
  }, [dispatch, filters])

  // state: products status
  const status = useAppSelector(state => state.features.products.status)

  // state: product ids
  const productIds = useAppSelector(state => {
    const products = state.features.products.data
    if (!products) return dispatch(setStatus('error'))
    return products.map((product) => product.kinguinId)
  }, shallowEqual) as number[]

  // log mounts
  useEffect(() => {
    const data = { status }
    log('navy', 'Comp: SearchList Mounted', data)
    return () => log('darkred', 'Comp: SearchList Unmounted')
  })

  function GridItem({ id }: { id: number }) {
    return <Product id={id} />
  }

  let ListContent: JSX.Element
  if (status === 'error') ListContent = (
    <Box width='100%' height='300px' justifyContent='center' alignItems='center' display='flex' flexDirection='column'>
      <ErrorOutline fontSize='large' />
      <Typography mt={2}>Oops! Something went wrong...</Typography>
      <Typography mt={1}>Try refreshing the page.</Typography>
    </Box>
  )
  else if (status === 'loading') ListContent = (
    <Box width='100%' height='300px' justifyContent='center' alignItems='center' display='flex'>
      <CircularProgress size={80} color='primary' />
    </Box>
  )
  else ListContent = (
    <Box maxWidth='1400px'>
      <Box display='flex' justifyContent='space-between' alignItems='center' mb={4} width={1}>
        {/* result count */}
        <Box display={{ xs: 'none', md: 'block' }} pr={2}>
          <Typography variant='subtitle1' display='inline' mr={1}><b>{results}</b></Typography>
          <Typography variant='subtitle1' display='inline' color='text.secondary' fontSize='0.95em'>Results</Typography>
        </Box>
        {/* top pagination */}
        <Box>
          <Pagination siblingCount={2} boundaryCount={0} count={Math.min(pages, 200)} page={filters.page} onChange={(e, page) => dispatch(setFilterPage(page))} color='primary' variant='outlined' shape='rounded'/>
        </Box>
        {/* search sort function */}
        <Box display='flex' alignItems='center'>
          <Sort sx={{ m: 1 }} />
          <Select value={filters.sortBy} sx={{ maxHeight: 50, minWidth: 100 }} onChange={(e) => dispatch(setSortBy(e.target.value))}>
            <MenuItem value='metacriticScore'>Rating</MenuItem>
            <MenuItem value='originalName'>Name</MenuItem>
            <MenuItem value='price'>Price</MenuItem>
            <MenuItem value='releaseDate'>Release</MenuItem>
          </Select>
          <ToggleButtonGroup orientation="vertical" value={filters.sortType} exclusive onChange={() => dispatch(toggleSortType())} sx={{ ml: 1 }}>
            <ToggleButton value="asc" sx={{ p: 0 }} >
              <ArrowDropUp />
            </ToggleButton>
            <ToggleButton value="desc" sx={{ p: 0 }} >
              <ArrowDropDown />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
      {/* search results */}
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {productIds.map((id) => (
          <Grid item xs={12} md={6} xl={4} key={id}>
            <GridItem id={id} />
          </Grid>
        ))}
      </Grid>
      {/* bottom pagination */}
      <Box display='flex' justifyContent='center' alignItems='center' mt={4} width={1}>
        <Pagination showFirstButton showLastButton hidePrevButton hideNextButton boundaryCount={0} count={Math.min(pages, 200)} page={filters.page} onChange={(e, page) => dispatch(setFilterPage(page))} color='primary' variant='outlined' shape='rounded'/>
      </Box>
    </Box>
  )

  return (
    <Box
      display='flex'
      alignItems='center'
      width='100%'
      flexDirection='column'
      component="main"
      padding={{ xs: 2, md: 3, xl: 4 }}
    >
      <Toolbar />
      {ListContent}
    </Box>
  )
}