import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import log from '../../../utils/logger'

import FilterDrawer from './components/FilterDrawer'
import SearchList from './components/SearchList'
import Header from '../../common/Header/Header'

import { Box } from '@mui/material'

export default function SearchPage() {
  const subject = useLocation().pathname.substring(1)

  // log mounts
  useEffect(() => {
    log('navy', `Page: /${subject} Mounted`)
    return () => log('darkred', `Page: /${subject} Unmounted`)
  })

  return <>
    <Box sx={{ display: 'flex' }}>
      <Header />
      {/* filters section */}
      <FilterDrawer />
      {/* products section */}
      <SearchList />
    </Box>
  </>
}