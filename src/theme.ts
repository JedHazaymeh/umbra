import { PaletteMode, ThemeOptions } from "@mui/material";
import * as colors from "@mui/material/colors";

export const getTheme = (mode: PaletteMode): ThemeOptions => (
  mode === 'dark' ? darkOptions : lightOptions
)

export const darkOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    common: {
      black: '#000',
      white: '#fff'
    },
    background: {
      paper: 'rgba(35, 37, 41, 1)',
      default: 'rgba(29, 30, 34, 1)'
    },
    primary: {
      light: 'rgba(117, 206, 255, 1)',
      main: 'rgba(24, 134, 255, 1)',
      dark: 'rgba(35, 105, 182, 1)',
      contrastText: '#fff'
    },
    secondary: {
      light: 'rgba(255, 129, 191, 1)',
      main: 'rgba(255, 48, 106, 1)',
      dark: 'rgba(183, 27, 71, 1)',
      contrastText: '#fff'
    },
    error: {
      light: 'rgba(251, 82, 82, 1)',
      main: 'rgba(255, 18, 0, 1)',
      dark: 'rgba(175, 26, 26, 1)',
      contrastText: '#fff'
    },
    text: {
      primary: 'rgba(255, 255, 255, 1)',
      secondary: 'rgba(255, 255, 255, 0.74)',
      disabled: 'rgba(212, 212, 212, 0.69)'
    }
  }
}

export const lightOptions: ThemeOptions = {
  palette: {
    mode: 'light'
  }
}