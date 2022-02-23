import { useMemo } from 'react'
import { useAppSelector } from './state/hooks'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'
import { createTheme, CssBaseline } from '@mui/material'

// Import theme
import getThemeOptions from './theme/build'

// Import pages
import HomePage from './features/pages/Home/HomePage'
import SearchPage from './features/pages/Search/SearchPage'
import AuthBasePage from './features/pages/Auth/AuthBasePage'
import RegisterPage from './features/pages/Auth/Register/RegisterPage'
import LoginPage from './features/pages/Auth/Login/LoginPage'
import LogoutPage from './features/pages/Auth/Logout/LogoutPage'
import ForgotPasswordPage from './features/pages/Auth/ForgotPassword/ForgotPasswordPage'
import ResetPasswordPage from './features/pages/Auth/ResetPassword/ResetPasswordPage'

export default function App() {
  const mode = useAppSelector((state) => state.settings.theme)
  const loggedIn = useAppSelector((state) => state.auth.loggedIn)

  const theme = useMemo(() => createTheme(getThemeOptions(mode)), [mode])

  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <Routes>
        <Route path=''         element={ <HomePage />     } />
        <Route path='products' element={ <SearchPage />   } />
        <Route path='games'    element={ <SearchPage />   } />
        <Route path='auth'     element={ <AuthBasePage /> }>
          <Route path='' element={
            loggedIn
              ? <Navigate replace to="/auth/logout" />
              : <Navigate replace to="/auth/login" />
          } />
          <Route path='register'        element={ <RegisterPage />        } />
          <Route path='login'           element={ <LoginPage />           } />
          <Route path='logout'          element={ <LogoutPage />          } />
          <Route path='forgot-password' element={ <ForgotPasswordPage />  } />
          <Route path='reset-password/:token' element={ <ResetPasswordPage /> } />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}