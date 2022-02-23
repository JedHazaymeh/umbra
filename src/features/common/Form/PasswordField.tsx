import { useEffect, useState, memo } from 'react'
import { FormikProps } from 'formik'

import log from '../../../utils/logger'

import {
  IconButton,
  InputAdornment,
  SxProps,
  TextField,
  Theme,
} from '@mui/material'

import {
  Visibility,
  VisibilityOff
} from '@mui/icons-material'

type Props = {
  name: string
  form: FormikProps<any>
  label?: string
  sx?: SxProps<Theme>
}

const PasswordField = memo(({ name, form, label, sx }: Props) => {
  const [showPassword, setShowPassword] = useState(false)
  const value = form.values[name]
  const touched = form.touched[name]
  const error = form.errors[name]

  // log mounts
  useEffect(() => {
    log('navy', 'Form: PasswordField Mounted')
    return () => log('darkred', 'Form: PasswordField Unmounted')
  })

  return (
    <TextField
      fullWidth
      id={name}
      name={name}
      label={label}
      type={showPassword ? 'text' : 'password'}
      value={value}
      onChange={form.handleChange}
      error={touched && !!error}
      helperText={touched && error}
      sx={{ my: 1, ...sx }}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={() => setShowPassword(!showPassword)}
              onMouseDown={(e) => e.preventDefault()}
              edge='end'
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  )
})

export default PasswordField