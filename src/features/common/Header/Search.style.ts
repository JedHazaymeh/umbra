import {
  styled,
  InputBase,
  ButtonBase
} from '@mui/material'

export const SearchBase = styled('div')(({ theme }) => ({
  backgroundColor: '#00000033',
  borderRadius: 5,
  border: '1px solid #00000000',
  maxHeight: 40,
  maxWidth: 600,
  flex: '1 0 auto',
  display: 'flex',
  displayDirection: 'row',
  alignItems: 'center'
}))

export const SearchInput = styled(InputBase)(({ theme }) => ({
  flex: '1 0 auto',
  'padding-left': 16
}))

export const SearchSubmit = styled(ButtonBase)(() => ({
  backgroundColor: '#00000022',
  borderTopRightRadius: 5,
  borderBottomRightRadius: 5,
  height: 40,
  width: 80,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: '#00000044',
  }
}))