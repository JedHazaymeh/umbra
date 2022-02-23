import { useEffect } from 'react'

import log from '../../../utils/logger'

import {
  Box,
  Link,
  Typography,
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
    <Link href='/products' underline='none'>
      <Typography variant="h6" noWrap component="div" sx={{
        display: 'flex',
        alignItems: 'center',
        ...sx
      }}>
        <Box color='white' px={0.5}>Umbra</Box>
        <Typography fontSize='0.6em' color='primary' px={0.5}>ALPHA</Typography>
      </Typography>
    </Link>
  )
}