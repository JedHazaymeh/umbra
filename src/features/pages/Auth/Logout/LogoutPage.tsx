import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../state/hooks'
import { Navigate } from 'react-router-dom'

import log from '../../../../utils/logger'

import {
  Box,
  Typography
} from '@mui/material'

import { logout } from '../../../../state/slices/auth.slice'

export default function LoginPage() {
  const loggedIn = useAppSelector((state) => state.auth.loggedIn)
  const tokens = localStorage.getItem('tokens')
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (tokens) {
      const parsedTokens = JSON.parse(tokens)
      if (parsedTokens.refresh.token) {
        const refreshToken = parsedTokens.refresh.token
        dispatch(logout(refreshToken))
      }
    }
  })

  // log mounts
  useEffect(() => {
    log('navy', 'Page: Logout Mounted')
    return () => log('darkred', 'Page: Logout Unmounted')
  })

  if (!loggedIn) return <Navigate replace to="/products" />

  return <>
    <Box my={3} display='flex' flexDirection='column' alignItems='center'>
      <Typography variant='h5' sx={{ py: 1 }}>Logging out</Typography>
      <Typography fontWeight='light' variant='subtitle1'>Redirecting...</Typography>
    </Box>
  </>
}