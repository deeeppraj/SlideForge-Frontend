import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Global from './Context/Global.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Global>
      <App />
    </Global>
  </StrictMode>,
)
