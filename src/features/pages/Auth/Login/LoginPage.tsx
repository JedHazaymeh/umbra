import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../state/hooks'
import { Navigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'

import log from '../../../../utils/logger'

import {
  Box,
  Button,
  Link,
  Typography
} from '@mui/material'

import Form from '../../../common/Form'
import FormField from '../../../common/Form/FormField'
import PasswordField from '../../../common/Form/PasswordField'

import { login } from '../../../../state/slices/auth.slice'

export default function LoginPage() {
  const loading = useAppSelector((state) => state.auth.loading)
  const loggedIn = useAppSelector((state) => state.auth.loggedIn)
  const dispatch = useAppDispatch()

  const validationSchema = yup.object({
    email: yup.string()
      .email('Email address is invalid')
      .required('Enter an email address'),
    password: yup.string()
      .min(8, 'Password can\'t be less than 8 characters')
      .max(64, 'Password can\'t exceed 64 characters')
      .required('Enter a password'),
  })

  const handleLogin = (values: {[k: string]: string }) => {
    dispatch(login(values))
  }
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => handleLogin(values)
  });

  // log mounts
  useEffect(() => {
    log('navy', 'Page: Login Mounted')
    return () => log('darkred', 'Page: Login Unmounted')
  })

  if (loggedIn) return <Navigate replace to="/products" />

  return <>
    <Box my={3} display='flex' flexDirection='column' alignItems='center'>
      <Typography variant='h5' sx={{ py: 1 }}>Sign in</Typography>
      <Typography fontWeight='light' variant='subtitle1'>to continue to Umbra</Typography>
    </Box>
    <Form onSubmit={formik.handleSubmit}>
      <FormField name='email' label='Email' form={formik} />
      <PasswordField name='password' label='Password' form={formik} />
      <Box
        width={1}
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        sx={{ my: 3 }}
      >
        <Link
          underline='none'
          variant='subtitle2'
          color='primary'
          href='/auth/forgot-password'
        >
          Forgot password?
        </Link>
        <Button
          color='primary'
          variant='contained'
          type='submit'
          disabled={loading}
          sx={{ width: 0.5 }}
        >
          Sign In
        </Button>
      </Box>
    </Form>
    <Typography component='div' variant='body1' color='text.secondary'>
      Don't have an account? <Link underline='none' fontSize='1em' variant='subtitle2' href='/auth/register'>Get Started</Link>
    </Typography>
  </>
}