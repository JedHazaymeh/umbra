// External imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// Local imports
import log from '../../utils/logger'

// API types + fetch function
import AuthService from '../../services/auth.service'
// State
export type AuthState = {
  loading: boolean
  error: boolean
  loggedIn: boolean
  user: any
}

let user;
const userItem = localStorage.getItem('user')
if (userItem) user = JSON.parse(userItem)
else user = null

const initialState = {
  loading: false,
  error: false,
  loggedIn: !!userItem,
  user
} as AuthState

// Slice
export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(register.pending, (state) => {
      state.loading = true
    })
    .addCase(register.fulfilled, (state, action) => {
      state.loading = false
      state.error = false
      state.loggedIn = true
      state.user = action.payload.user;
    })
    .addCase(register.rejected, (state) => {
      state.loading = false
      state.error = true
      state.loggedIn = false
      state.user = null
    })
    .addCase(login.pending, (state) => {
      state.loading = true
    })
    .addCase(login.fulfilled, (state, action) => {
      state.loading = false
      state.error = false
      state.loggedIn = true
      state.user = action.payload.user;
    })
    .addCase(login.rejected, (state) => {
      state.loading = false
      state.error = true
      state.loggedIn = false
      state.user = null
    })
    .addCase(logout.pending, (state) => {
      state.loading = true
    })
    .addCase(logout.fulfilled, (state) => {
      state.loading = false
      state.error = false
      state.loggedIn = false
      state.user = null
    })
    .addCase(logout.rejected, (state) => {
      state.loading = false
      state.error = true
      state.loggedIn = false
      state.user = null
    })
    .addCase(refreshTokens.pending, (state) => {
      state.loading = true
    })
    .addCase(refreshTokens.fulfilled, (state) => {
      state.loading = false
      state.error = false
    })
    .addCase(refreshTokens.rejected, (state) => {
      state.loading = false
      state.error = true
    })
    .addCase(forgotPassword.pending, (state) => {
      state.loading = true
    })
    .addCase(forgotPassword.fulfilled, (state) => {
      state.loading = false
      state.error = false
    })
    .addCase(forgotPassword.rejected, (state) => {
      state.loading = false
      state.error = true
    })
    .addCase(resetPassword.pending, (state) => {
      state.loading = true
    })
    .addCase(resetPassword.fulfilled, (state) => {
      state.loading = false
      state.error = false
    })
    .addCase(resetPassword.rejected, (state) => {
      state.loading = false
      state.error = true
    })
  }
})

export const register = createAsyncThunk(
  'auth/register',
  async ({ username, email, password, role }: {[key: string]: string }, thunkAPI) => {
    log('darkgreen', 'Action: auth/register')
    try {
      const response = await AuthService.register({ username, email, password, role });
      return response.data
    } catch (error: any) {
      const message = error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: {[key: string]: string }, thunkAPI) => {
    log('darkgreen', 'Action: auth/login')
    try {
      const response = await AuthService.login({ email, password })
      return response.data
    } catch (error: any) {
      const message = error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (refreshToken: string, thunkAPI) => {
    log('darkgreen', 'Action: auth/logout')
    try {
      const response = await AuthService.logout({ refreshToken })
      return response
    } catch (error: any) {
      const message = error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const refreshTokens = createAsyncThunk(
  'auth/refreshTokens',
  async (refreshToken: string, thunkAPI) => {
    log('darkgreen', 'Action: auth/refreshTokens')
    try {
      const response = await AuthService.refreshTokens({ refreshToken })
      return response
    } catch (error: any) {
      const message = error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email: string, thunkAPI) => {
    log('darkgreen', 'Action: auth/forgotPassword')
    try {
      const response = await AuthService.forgotPassword({ email })
      return response
    } catch (error: any) {
      const message = error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ password, token }: {[key: string]: string }, thunkAPI) => {
    log('darkgreen', 'Action: auth/resetPassword')
    try {
      const response = await AuthService.resetPassword({ password, token })
      return response
    } catch (error: any) {
      const message = error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export default AuthSlice.reducer