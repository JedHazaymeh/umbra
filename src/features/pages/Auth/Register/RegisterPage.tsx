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

import { register } from '../../../../state/slices/auth.slice'

export default function RegisterPage() {
  const loading = useAppSelector((state) => state.auth.loading)
  const loggedIn = useAppSelector((state) => state.auth.loggedIn)
  const dispatch = useAppDispatch()

  const validationSchema = yup.object().shape({
    username: yup.string()
    .min(3, 'Username can\'t be less than 3 characters')
    .max(64, 'Username can\'t exceed 64 characters')
    .required('Enter a username'),
    email: yup.string()
      .email('Don\'t forget to include the \'@\'')
      .required('Enter an email address'),
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
  });

  const handleRegister = ({ username, email, password, role }: {[k: string]: string }) => {
    dispatch(register({ username, email, password, role }))
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'user'
    },
    validationSchema: validationSchema,
    onSubmit: (values) => handleRegister(values)
  });

  // log mounts
  useEffect(() => {
    log('navy', 'Page: Register Mounted')
    return () => log('darkred', 'Page: Register Unmounted')
  })

  if (loggedIn) return <Navigate replace to="/products" />

  return <>
    <Box my={3} display='flex' flexDirection='column' alignItems='center'>
      <Typography variant='h5' sx={{ py: 1 }}>Let's Get Started</Typography>
      <Typography fontWeight='light' variant='subtitle1'>Create an account</Typography>
    </Box>
    <Form
      onSubmit={formik.handleSubmit}
    >
      <FormField name='username' label='Username' form={formik} />
      <FormField name='email' label='Email' form={formik} />
      <PasswordField name='password' label='Password' form={formik} />
      <PasswordField name='confirmPassword' label='Confirm Password' form={formik} />
      <Button
        fullWidth
        color="primary"
        variant="contained"
        type="submit"
        disabled={loading}
        sx={{ my: 2 }}
      >
        Register
      </Button>
    </Form>
    <Typography component='div' variant='body1' color='text.secondary'>
      Already have an account? <Link underline='none' fontSize='1em' variant='subtitle2' href='/auth/login'>Sign In</Link>
    </Typography>
  </>
}