import { useEffect } from 'react'
import log from '../../../utils/logger'

import {
  AppBar,
  Box,
  Toolbar
} from '@mui/material'

import Search from './Search'
import Logo from '../Logo'

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { drawerWidth } from '../../pages/Search/components/FilterDrawer'

export default function Header() {
  // log mounts
  useEffect(() => {
    log('navy', 'Navigation: Header Mounted')
    return () => log('darkred', 'Navigation: Header Unmounted')
  })

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Logo sx={{
          flexDirection: 'row',
          width: { xs: 'auto', ...drawerWidth },
          pr: 4
        }} />
        <Box display='flex' justifyContent='center' flex='0.75 0 auto'>
          <Search />
        </Box>
        <Box display='flex' ml={2}>
          <AccountCircleIcon fontSize='large'/>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
