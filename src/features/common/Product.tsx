import React, { useEffect } from 'react'
import { useAppSelector } from '../../state/hooks'
import log from '../../utils/logger'

import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Checkbox,
  Chip,
  Box,
  Grid
} from '@mui/material'

import {
  BookmarkBorder,
  FavoriteBorder,
  Bookmark,
  Favorite
} from '@mui/icons-material';

type props = {
  id: number
}

const Product = React.memo(function Product({ id }: props) {
  const data = useAppSelector(state => {
    const products = state.features.products.data
    return products.find(product => product.kinguinId === id)
  })

  // log mounts
  useEffect(() => {
    const data = { id }
    log('navy', 'Comp: Product Mounted', data)
    return () => log('darkred', 'Comp: Product Unmounted', data)
  })

  if (!data) return <></>

  let company = '';
  if (data.publishers && data.publishers[0]) company = data.publishers[0]
  else if (data.developers && data.developers[0]) company = data.developers[0]
  const cover = data.images.cover

  return (
    <CardActionArea>
      <Card sx={{
        display: 'flex',
        height: ['120px', '140px', '160px'],
        // border: '1px dashed cyan'
      }}>
        {/* product card: cover image */}
        <CardMedia
          component="img"
          sx={{
            objectFit: 'cover',
            height: '100%',
            width: ['25%', '25%', '30%']
          }}
          image={!cover.url ? cover.thumbnail : cover.url}
          alt="Cover Image"
        />
        {/* product card: content */}
        <CardContent sx={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          pt: ['8px', '12px'],
          // border: '1px dashed red'
        }}>
          {/* header grid */}
          <Grid container mb='2px' height='26px'>
            {/* header left: product title */}
            <Grid item xs={9} flex='1 0' sx={{ height: 1, maskImage: 'linear-gradient(90deg, #000 85%, transparent 98%)' }}>
              <Typography sx={{ wordBreak: 'break-all', fontSize: ['1.1em', '1.2em', '1.1em', '1.2em'] }} variant='h6' component='div'>
                {!data.originalName ? data.name : data.originalName}
              </Typography>
            </Grid>
            {/* header right: card extras */}
            <Grid item xs={3}>
              <Grid container rowSpacing={1} flexDirection='row-reverse'>
                <Checkbox sx={{ mr: -1 }} icon={<BookmarkBorder />} checkedIcon={<Bookmark />} />
                <Checkbox sx={{ mr: -1, '&.Mui-checked': { color: 'crimson', } }} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
              </Grid>
            </Grid>
          </Grid>
          {/* middle box */}
          <Box display='flex' flexDirection='column' flex='1 0 auto'>
            {/* middle top: product tags */}
            <Box flex='1 0 auto'>
                {data.tags.map((tag) => <Chip sx={{ textTransform: 'uppercase', mr: '5px', fontSize: '0.9em' }} label={tag} color='primary' size='small' variant='outlined' />)}
            </Box>
            {/* middle bottom: product company */}
            <Typography sx={{ fontSize: ['1em', '1.1em', '1em', '1.1em'], mb: '5px' }} display={['none', 'none', 'block']} variant='subtitle1' color='text.secondary' component='div'>
              {company}
            </Typography>
          </Box>
          {/* footer box */}
          <Box display='flex' flexDirection='row'>
            {/* footer left: product genres */}
            <Typography sx={{ fontSize: '1em' }} display={['none', 'inline-block', 'block']} flex='1 0 auto' variant='subtitle2' color='text.secondary' component='div'>
              {data.genres.slice(0, 3).join(' • ')}
            </Typography>
            {/* footer right: product price */}
            <Typography sx={{ fontSize: ['1em', '1.2em', '1.1em', '1.2em'] }} variant='h6' component='div'>
              € {data.price}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </CardActionArea>
  )
})

export default Product