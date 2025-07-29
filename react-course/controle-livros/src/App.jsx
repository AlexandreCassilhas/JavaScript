import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ControleLivros from './ControleLivros'
import { BrowserRouter } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ControleLivros />
    </BrowserRouter>
  </StrictMode>,
)
