import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../state/hooks'
import { Navigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'

import log from '../../../../utils/logger'

import {
  Alert,
  Box,
  Button,
  Typography
} from '@mui/material'

import Form from '../../../common/Form'
import PasswordField from '../../../common/Form/PasswordField'

import { resetPassword } from '../../../../state/slices/auth.slice'

export default function ResetPasswordPage() {
  const { token } = useParams()
  const [message, setMessage] = useState('')

  const loading = useAppSelector((state) => state.auth.loading)
  const error = useAppSelector((state) => state.auth.error)
  const loggedIn = useAppSelector((state) => state.auth.loggedIn)
  const dispatch = useAppDispatch()
  
  const validationSchema = yup.object({
    password: yup.string()
      .min(8, 'Password can\'t be less than 8 characters')
      .max(64, 'Password can\'t exceed 64 characters')
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])/,
        'Password must contain at least one letter & number'
      )
      .required('Enter a password'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], 'Passwords don\'t match')
  })

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema,
    onSubmit: (values) => handleResetPassword(values)
  })

  // log mounts
  useEffect(() => {
    log('navy', 'Page: ResetPassword Mounted')
    return () => log('darkred', 'Page: ResetPassword Unmounted')
  })
  
  const handleResetPassword = ({ password }: { [k: string]: string }) => {
    if (token) {
      dispatch(resetPassword({ password, token }))
      .then(() => setMessage('Password successfully reset!'))
      .catch((message: string) => setMessage(message))
    }
  }
  
  if (loggedIn) return <Navigate replace to="/products" />

  return <>
    <Box my={3} display='flex' flexDirection='column' alignItems='center'>
      <Typography variant='h5' sx={{ py: 1 }}>Reset Password</Typography>
      <Typography fontWeight='light' variant='subtitle1'>Enter your new password</Typography>
    </Box>
    <Form onSubmit={formik.handleSubmit}>
      <PasswordField name='password' label='New Password' form={formik} />
      <PasswordField name='confirmPassword' label='Confirm Password' form={formik} />
      <Button
        fullWidth
        color="primary"
        variant="contained"
        type="submit"
        disabled={loading || !!message}
        sx={{ my: 2 }}
      >
        Reset Password
      </Button>
      {message && <Alert severity={error ? 'error' : 'success'}>{message}</Alert>}
    </Form>
  </>
}