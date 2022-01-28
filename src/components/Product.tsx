import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography
} from '@mui/material'

export default function Product() {
  const render = () => {
    return (
      <Card sx={{ height: '300px', width: '220px', background: '#232529', color: 'white' }}>
        <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image=""
          alt="Cover Image"
        />
        <CardContent>
          <Typography gutterBottom variant='h6' component='div'>
            Title
          </Typography>
          <Typography variant='subtitle1' color='darkgrey'>
            Price
          </Typography>
        </CardContent>
        </CardActionArea>
      </Card>
    )
  }

  return (
    <>
      {render()}
    </>
  )
}