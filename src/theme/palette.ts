import {
  PaletteMode,
  PaletteOptions
} from "@mui/material/"

const paletteOptions = (mode: PaletteMode): PaletteOptions => ({
  ...(mode === 'dark' ? darkOptions : lightOptions),
  external: {
    'Steam': '#0e3270',
    'PlayStation 5': '#1e5ddb',
    'PlayStation 4': '#1e5ddb',
    'PlayStation 3': '#1e5ddb',
    'XBOX Series X|S': '#107c10',
    'XBOX ONE': '#107c10',
    'XBOX 360': '#107c10',
    'Nintendo': '#b4101d'
  }
})

const darkOptions: PaletteOptions = {
  mode: 'dark',
  common: {
    black: '#000',
    white: '#fff',
  },
  background: {
    paper: '#232529',
    default: '#1d1e22'
  },
  primary: {
    light: '#75ceff',
    main: '#1886ff',
    dark: '#2369b6',
    contrastText: '#fff'
  },
  secondary: {
    light: '#ff81bf',
    main: '#ff306a',
    dark: '#b71b47',
    contrastText: '#fff'
  },
  error: {
    light: '#fb5252',
    main: '#ff1200',
    dark: '#af1a1a',
    contrastText: '#fff'
  },
  text: {
    primary: '#fff',
    secondary: '#ffffff88',
    disabled: '#d4d4d4b0'
  }
}

const lightOptions: PaletteOptions = {
  mode: 'light'
}

declare module '@mui/material' {
  interface Palette {
    external: {
      [key: string]: React.CSSProperties['color']
      'Steam': React.CSSProperties['color']
      'PlayStation 5': React.CSSProperties['color']
      'PlayStation 4': React.CSSProperties['color']
      'PlayStation 3': React.CSSProperties['color']
      'XBOX Series X|S': React.CSSProperties['color']
      'XBOX ONE': React.CSSProperties['color']
      'XBOX 360': React.CSSProperties['color']
      'Nintendo': React.CSSProperties['color']
    }
  }

  interface PaletteOptions {
    external?: {
      'Steam': React.CSSProperties['color']
      'PlayStation 5': React.CSSProperties['color']
      'PlayStation 4': React.CSSProperties['color']
      'PlayStation 3': React.CSSProperties['color']
      'XBOX Series X|S': React.CSSProperties['color']
      'XBOX ONE': React.CSSProperties['color']
      'XBOX 360': React.CSSProperties['color']
      'Nintendo': React.CSSProperties['color']
    }
  }
}

export default paletteOptions