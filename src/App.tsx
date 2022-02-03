import { useMemo } from 'react'
import { useAppSelector } from './state/hooks'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'
import { createTheme, CssBaseline } from '@mui/material'

// Import pages
import HomePage from './features/pages/Home/HomePage'
import SearchPage from './features/pages/Search/SearchPage'

// Import theme
import { getTheme } from './theme'

export default function App() {
  const mode = useAppSelector((state) => state.settings.theme)
  const theme = useMemo(() => createTheme(getTheme(mode)), [mode])

  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <Routes>
        <Route path='/'         element={ <HomePage /> } />
        <Route path='/products' element={ <SearchPage /> } />
        <Route path='/games'    element={ <SearchPage /> } />
      </Routes>
    </ThemeProvider>
  )
}