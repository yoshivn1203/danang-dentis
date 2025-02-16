import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface ThemeState {
  isDark: boolean
}

const initialState: ThemeState = {
  isDark: false
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: state => {
      state.isDark = !state.isDark
    },
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.isDark = action.payload
    }
  }
})

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer
