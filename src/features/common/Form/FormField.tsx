import { useEffect, memo } from 'react'
import { FormikProps } from 'formik'

import log from '../../../utils/logger'

import {
  SxProps,
  TextField,
  Theme,
} from '@mui/material'


type Props = {
  name: string
  form: FormikProps<any>
  label?: string
  sx?: SxProps<Theme>
}

const FormField = memo(({ name, form, label, sx }: Props) => {
  const value = form.values[name]
  const touched = form.touched[name]
  const error = form.errors[name]

  // log mounts
  useEffect(() => {
    log('navy', 'Form: FormField Mounted')
    return () => log('darkred', 'Form: FormField Unmounted')
  })

  return (
    <TextField
      fullWidth
      id={name}
      name={name}
      label={label}
      type='text'
      value={value}
      onChange={form.handleChange}
      error={touched && !!error}
      helperText={touched && error}
      sx={{ my: 1, ...sx }}
    />
  )
})

export default FormField