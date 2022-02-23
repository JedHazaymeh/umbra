import axios, { AxiosResponse } from 'axios'

import API_URL from './statics/api'

async function register({ username, email, password }: {[key: string]: string }) {
  const res: AxiosResponse = await axios.post(API_URL + '/auth/register', {
    username,
    email,
    password
  })

  if (res.data && res.data.user && res.data.tokens) {
    localStorage.setItem('user', JSON.stringify(res.data.user))
    localStorage.setItem('tokens', JSON.stringify(res.data.tokens))
  }

  return res
}

async function login({ email, password }: {[key: string]: string }) {
  const res: AxiosResponse = await axios.post(API_URL + '/auth/login', {
    email,
    password
  })

  if (res.data && res.data.user && res.data.tokens) {
    localStorage.setItem('user', JSON.stringify(res.data.user))
    localStorage.setItem('tokens', JSON.stringify(res.data.tokens))
  }

  return res
}

async function logout({ refreshToken }: {[key: string]: string }) {
  const res: AxiosResponse = await axios.post(API_URL + '/auth/logout', {
    refreshToken
  })

  localStorage.removeItem('user')
  localStorage.removeItem('tokens')

  return res
}

async function refreshTokens({ refreshToken }: {[key: string]: string }) {
  const res: AxiosResponse = await axios.post(API_URL + '/auth/refresh-tokens', {
    refreshToken
  })

  if (res.data && res.data.tokens) {
    localStorage.setItem('tokens', JSON.stringify(res.data.tokens))
  }

  return res
}

async function forgotPassword({ email }: {[key: string]: string }) {
  const res: AxiosResponse = await axios.post(API_URL + '/auth/forgot-password', {
    email
  })

  return res
}

async function resetPassword({ password, token }: {[key: string]: string }) {
  const res: AxiosResponse = await axios.post(API_URL + '/auth/reset-password', {
    password
  }, {
    params: {
      token
    }
  })

  return res
}

const AuthService = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword
}

export default AuthService