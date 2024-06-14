import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './services/ThemeContext';
import { FavoritesProvider } from './services/FavoritesContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
          <BrowserRouter>
                    <ThemeProvider>
                              <FavoritesProvider>
                                        <App />
                              </FavoritesProvider>
                    </ThemeProvider>
          </BrowserRouter>
  </React.StrictMode>,
)
