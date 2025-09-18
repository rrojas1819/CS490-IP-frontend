import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  //Don't forget to remove StrictMode as it doubles stuff
  <StrictMode>
    <App />
  </StrictMode>,
)
