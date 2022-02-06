import {
  PaletteMode,
  ThemeOptions
} from "@mui/material/";


import PaletteOptions from './palette'

const getThemeOptions = (mode: PaletteMode): ThemeOptions => ({
  palette: PaletteOptions(mode),
})

export default getThemeOptions