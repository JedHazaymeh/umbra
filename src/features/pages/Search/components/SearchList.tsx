import { useAppDispatch, useAppSelector } from "../../../../state/hooks"
import { useEffect, useMemo } from "react"
import { useLocation } from "react-router-dom"
import { shallowEqual } from "react-redux"

import log from "../../../../utils/logger"

import { setFilterPage, setSortBy, toggleSortType } from "../../../../state/slices/FilterSlice"
import { searchProducts, setStatus } from "../../../../state/slices/ProductSlice"
import Product from "../../../common/Product"

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

import ArrowDownIcon from '@mui/icons-material/ArrowDropDownRounded'
import ArrowUpIcon from '@mui/icons-material/ArrowDropUpRounded'

import { drawerWidth } from "./FilterDrawer"

export default function SearchList() {
  const subject = useLocation().pathname.substring(1)
  
  const filters = useAppSelector((state) => state.features.filters[subject])
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
    switch (subject) {
      case 'products':
        return <Product id={id} />
      default:
        return <p>Invalid grid item</p>
    }
  }

  let ListContent: JSX.Element
  if (status === 'error') ListContent = <></>
  else if (status === 'loading') ListContent = (
    <Box width='100%' height='300px' justifyContent='center' alignItems='center' display='flex'>
      <CircularProgress size={80} color='primary' />
    </Box>
  )
  else ListContent = <>
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {productIds.map((id) => (
        <Grid item xs={12} md={6} xl={4} key={id}>
          <GridItem id={id} />
        </Grid>
      ))}
    </Grid>
  </>

  return (
    <Box
      display='flex'
      flexDirection='column'
      component="main"
      sx={{ flexGrow: 1, p: { xs: 2, md: 3, xl: 4 }, width: { sm: `calc(100% - ${drawerWidth}px)` }, maxWidth: '1400px' }}
    >
      <Toolbar />
      <Box display='flex' justifyContent='space-between' alignItems='center' mb={4} width={1}>
        <Box display={{ xs: 'none', md: 'block' }} pr={2}>
          <Typography variant='subtitle1' display='inline' mr={1}><b>{results}</b></Typography>
          <Typography variant='subtitle1' display='inline' color='text.secondary' fontSize='0.95em'>Results</Typography>
        </Box>
        <Box>
          <Pagination showFirstButton showLastButton hidePrevButton hideNextButton boundaryCount={0} count={Math.min(pages, 200)} page={filters.page} onChange={(e, page) => dispatch(setFilterPage(page))} color='primary' variant='outlined' shape='rounded'/>
        </Box>
        <Box display='flex' alignItems='center'>
          <Typography variant='subtitle1' color='text.secondary' fontSize='0.95em' display={{ xs: 'none', md: 'inline' }} mr={1}>Sort by</Typography>
          <Select value={filters.sortBy} sx={{ maxHeight: 50, minWidth: 100 }} onChange={(e) => dispatch(setSortBy(e.target.value))}>
            <MenuItem value='metacriticScore'>Rating</MenuItem>
            <MenuItem value='originalName'>Name</MenuItem>
            <MenuItem value='price'>Price</MenuItem>
            <MenuItem value='releaseDate'>Release</MenuItem>
          </Select>
          <ToggleButtonGroup orientation="vertical" value={filters.sortType} exclusive onChange={() => dispatch(toggleSortType())} sx={{ ml: 1 }}>
            <ToggleButton value="asc" sx={{ p: 0 }} >
              <ArrowUpIcon />
            </ToggleButton>
            <ToggleButton value="desc" sx={{ p: 0 }} >
              <ArrowDownIcon />
            </ToggleButton>
            </ToggleButtonGroup>
        </Box>
      </Box>
      {ListContent}
      <Box display='flex' justifyContent='center' alignItems='center' mt={4} width={1}>
        <Pagination showFirstButton showLastButton hidePrevButton hideNextButton boundaryCount={0} count={Math.min(pages, 200)} page={filters.page} onChange={(e, page) => dispatch(setFilterPage(page))} color='primary' variant='outlined' shape='rounded'/>
      </Box>
    </Box>
  )
}