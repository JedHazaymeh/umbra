import { styled, Chip } from '@mui/material'

const ExternalChip = styled(Chip)(({ label, theme }) => {
  const external = label as string
  return {
    'backgroundColor': `${theme.palette.external[external]} !important`,
    '&:hover': {
      'backgroundColor': theme.palette.external[external],
      'filter': 'brightness(120%)',
    },
    '&:active': {
      'boxShadow': 'none',
      'backgroundColor': theme.palette.external[external],
      'borderColor': theme.palette.external[external],
    },
    fontWeight: 'bold'
  }
})

export default ExternalChip