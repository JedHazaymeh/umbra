import { useEffect } from 'react'
import log from '../../utils/logger'

import {
  AppBar,
  Toolbar,
  Typography
} from '@mui/material'

export default function Header() {
  // log mounts
  useEffect(() => {
    log('navy', 'Navigation: Header Mounted')
    return () => log('darkred', 'Navigation: Header Unmounted')
  })

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Umbra | Placeholder Header
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
