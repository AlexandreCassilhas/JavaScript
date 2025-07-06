import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ControleLivros from './ControleLivros'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ControleLivros />
  </StrictMode>,
)
