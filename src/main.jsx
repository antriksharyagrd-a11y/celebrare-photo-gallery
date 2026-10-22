// src/main.jsx
// Entry point: mount <App /> inside React.StrictMode.
// StrictMode double-invokes effects in development to help you spot
// missing cleanups — that is why the fetch effect uses an AbortController.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
