import { useEffect } from 'react'
import { useAppSelector } from '../../../state/hooks'

import log from '../../../utils/logger'

import {
  AppBar,
  Box,
  Button,
  Toolbar
} from '@mui/material'

import Search from './Search'
import Logo from '../Logo'

import { AccountCircleOutlined } from '@mui/icons-material'

export default function Header() {
  const loggedIn = useAppSelector((state) => state.auth.loggedIn)

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
          mr: 4
        }} />
        <Box display='flex' justifyContent='center' flex='0.75 0 auto'>
          <Search />
        </Box>
        <Box display='flex' ml={2}>
          {loggedIn
            ? <>
              <Button variant='outlined' href='/auth/logout' endIcon={<AccountCircleOutlined />}>
                Sign Out
              </Button>
            </>
            : <>
              <Button variant='text' color='inherit' href='/auth/login'>
                Sign In
              </Button>
              <Button variant='contained' href='/auth/register'>
                Get Started
              </Button>
            </>
          }
        </Box>
      </Toolbar>
    </AppBar>
  )
}
