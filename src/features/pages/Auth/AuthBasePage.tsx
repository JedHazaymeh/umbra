import { useEffect } from 'react'
import { useAppSelector } from '../../../state/hooks'
import { Outlet } from 'react-router-dom'

import log from '../../../utils/logger'

import {
  Box,
  LinearProgress,
  Paper
} from '@mui/material'

import Logo from '../../common/Logo'


export default function AuthBasePage() {
  const loading = useAppSelector((state) => state.auth.loading)

  // log mounts
  useEffect(() => {
    log('navy', 'Base: Auth Mounted')
    return () => log('darkred', 'Base: Auth Unmounted')
  })

  return <>
    <Box
      width='100vw'
      height='100vh'
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <Box
        width={1}
        height={1}
        maxWidth='450px'
        maxHeight='600px'
      >
        <Paper
          elevation={0}
          sx={{
            width: 1,
            height: 1
          }}
        >
          {loading && <LinearProgress />}
          <Box
            height={1}
            width={1}
            p={5}
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            flexDirection='column'
          >
            <Logo />
            <Outlet />
          </Box>
        </Paper>
      </Box>
    </Box>
  </>
}