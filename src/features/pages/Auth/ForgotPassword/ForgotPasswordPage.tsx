import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../state/hooks'
import { Navigate } from 'react-router-dom'
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
import FormField from '../../../common/Form/FormField'

import { forgotPassword } from '../../../../state/slices/auth.slice'

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState('')

  const loading = useAppSelector((state) => state.auth.loading)
  const error = useAppSelector((state) => state.auth.error)
  const loggedIn = useAppSelector((state) => state.auth.loggedIn)
  const dispatch = useAppDispatch()

  const validationSchema = yup.object({
    email: yup.string()
      .email('Email address is invalid')
      .required('Enter an email address')
  })

  const handleForgotPassword = ({ email }: { [k: string]: string }) => {
    dispatch(forgotPassword(email))
    .then(() => setMessage(`Email has been sent to: ${email}`))
    .catch((message: string) => setMessage(message))
  }
  
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: (values) => handleForgotPassword(values)
  });

  // log mounts
  useEffect(() => {
    log('navy', 'Page: ForgotPassword Mounted')
    return () => log('darkred', 'Page: ForgotPassword Unmounted')
  })

  if (loggedIn) return <Navigate replace to="/products" />

  return <>
    <Box my={3} display='flex' flexDirection='column' alignItems='center'>
      <Typography variant='h5' sx={{ py: 1 }}>Request Password Reset</Typography>
      <Typography fontWeight='light' variant='subtitle1'>Enter the email address of your account</Typography>
    </Box>
    <Form onSubmit={formik.handleSubmit}>
      <FormField name='email' label='Email' form={formik} />
      <Button
        fullWidth
        color="primary"
        variant="contained"
        type="submit"
        disabled={loading}
        sx={{ my: 2 }}
      >
        Request Password Reset
      </Button>
      {message && <Alert severity={error ? 'error' : 'success'}>{message}</Alert>}
    </Form>
  </>
}