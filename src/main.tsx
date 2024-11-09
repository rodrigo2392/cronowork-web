import React from 'react'
import ReactDOM from 'react-dom/client'
import Navigation from './routes'
import { Provider } from 'react-redux'
import { persistor, store } from './store'
import SnackbarProvider from 'react-simple-snackbar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PersistGate } from 'redux-persist/integration/react'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider>
            <Navigation />
          </SnackbarProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
