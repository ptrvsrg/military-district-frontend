import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './i18n'
import './styles/css/index.css'

createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <p>Hello</p>
  </StrictMode>
)
