import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { LoaderProvider } from './contexts/LoaderContext.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.config.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <LoaderProvider>
          <Provider store={store}>
             <App />
          </Provider>
        </LoaderProvider>
    </GoogleOAuthProvider>
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
