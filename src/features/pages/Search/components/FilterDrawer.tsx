import { useEffect, useState } from 'react'

import log from '../../../../utils/logger'

import {
  Drawer,
  Toolbar,
  Box
} from '@mui/material'

import FilterContent from './FilterContent'

export const drawerWidth = { sm: 210, lg: 240 }

export default function FilterDrawer() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  };
  
  // log mounts
  useEffect(() => {
    log('navy', 'Comp: FilterDrawer Mounted')
    return () => log('darkred', 'Comp: FilterDrawer Unmounted')
  })

  return (
    <Box
      component='nav'
      sx={{ width: drawerWidth, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant='temporary'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Toolbar />
        <Box sx={{ p: 2 }}>
          <FilterContent />
        </Box>
      </Drawer>
      <Drawer
        variant='permanent'
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        <Toolbar />
        <Box sx={{ p: 2 }}>
          <FilterContent />
        </Box>
      </Drawer>
    </Box>
  )
}
