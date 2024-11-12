import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../'

interface AppState {
  theme: string
  themeColor: string
  drawerOpened: boolean
  rowsPerPage: number
}
const initialState: AppState = {
  theme: 'light',
  themeColor: '',
  drawerOpened: true,
  rowsPerPage: 10,
}

export const appSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    changeTheme: state => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
    changeDrawer: state => {
      state.drawerOpened = !state.drawerOpened
    },
    changeRowPerPage: (
      state,
      action: PayloadAction<{ rowsPerPage: number }>,
    ) => {
      state.rowsPerPage = action.payload.rowsPerPage
    },
  },
})

export const { changeTheme, changeDrawer, changeRowPerPage } = appSlice.actions
export const selectRowsPerPage = (state: RootState) =>
  state.appState.rowsPerPage
export const selectTheme = (state: RootState) => state.appState.theme
export const selectDrawerOpened = (state: RootState) =>
  state.appState.drawerOpened

export default appSlice.reducer
