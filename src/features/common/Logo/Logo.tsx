import { useEffect } from 'react'

import log from '../../../utils/logger'

import {
  Typography,
  Box,
  SxProps,
  Theme
} from '@mui/material'

type Props = {
  sx?: SxProps<Theme>
}

export default function Logo({ sx }: Props) {
  // log mounts
  useEffect(() => {
    log('navy', 'Comp: Logo Mounted')
    return () => log('darkred', 'Comp: Logo Unmounted')
  })

  return (
    <Typography variant="h6" noWrap component="div" sx={{
      display: 'flex',
      alignItems: 'center',
      ...sx
    }}>
      <Box px={1}>Umbra</Box>
      <Typography fontSize='0.6em' color='primary'>ALPHA</Typography>
    </Typography>
  )
}