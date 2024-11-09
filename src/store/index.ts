import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import AuthReducer from './slices/auth.slice'
import AppReducer from './slices/app.slice'

const persistConfig = {
  key: 'root',
  storage,
}

const reducers = combineReducers({
  authState: AuthReducer,
  appState: AppReducer,
})
const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)
export default store
