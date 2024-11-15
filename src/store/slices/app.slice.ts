import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../'

interface AppState {
  theme: string
  themeColor: string
  drawerOpened: boolean
  rowsPerPage: number
  isTracking: boolean
  interval: number | null
}
const initialState: AppState = {
  theme: 'light',
  themeColor: '',
  drawerOpened: true,
  rowsPerPage: 10,
  isTracking: false,
  interval: null,
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
    changeTracking: (state, action) => {
      state.isTracking = action.payload.state
    },
    changeInterval: (state, action) => {
      console.log({ val: action.payload.value })
      state.interval = action.payload.value
    },
  },
})

export const {
  changeTheme,
  changeDrawer,
  changeRowPerPage,
  changeTracking,
  changeInterval,
} = appSlice.actions
export const selectRowsPerPage = (state: RootState) =>
  state.appState.rowsPerPage
export const selectTheme = (state: RootState) => state.appState.theme
export const selectDrawerOpened = (state: RootState) =>
  state.appState.drawerOpened
export const selectIsTracking = (state: RootState) => state.appState.isTracking
export const selectInterval = (state: RootState) => state.appState.interval

export default appSlice.reducer
