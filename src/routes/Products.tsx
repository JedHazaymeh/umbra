import { useEffect } from 'react'
import log from '../utils/logger'

import { Grid } from '@mui/material'
import Product from '../components/Product'

export default function Products() {
  // log mounts
  useEffect(() => {
    log('navy', 'Route: Products Mounted')
    return () => log('darkred', 'Route: Products Unmounted')
  })

  const render = () => {
    return (
      <Grid container justifyContent='center' spacing={4}>
        {[0, 1, 2, 3, 4, 5].map(value => (
          <Grid key={value} item>
            <Product />
          </Grid>
        ))}
      </Grid>
    )
  }

  return (
    <>
      {render()}
    </>
  )
}