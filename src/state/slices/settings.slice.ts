// External imports
import { createSlice } from '@reduxjs/toolkit'
import { PaletteMode } from '@mui/material'

// Local imports
import log from '../../utils/logger'

// State
export type SettingState = {
  theme: PaletteMode
}

const initialState = {
  theme: 'dark'
} as SettingState

// Slice
export const SettingSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      log('darkgreen', 'Action: theme/toggleTheme')
      state.theme = (state.theme === 'light' ? 'dark' : 'light')
    }
  }
})

export const {
  toggleTheme
} = SettingSlice.actions

export default SettingSlice.reducer