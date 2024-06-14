import {describe, test, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import App from './App.tsx'
import {BrowserRouter} from 'react-router-dom';
import { ThemeProvider } from './services/ThemeContext';
import { FavoritesProvider } from './services/FavoritesContext';


describe('Init', () => {
  test('Load page', () => {
    render(
          <BrowserRouter>
                    <ThemeProvider>
                              <FavoritesProvider>
                                        <App/>
                              </FavoritesProvider>
                    </ThemeProvider>
          </BrowserRouter>);
    expect(screen.findByText(/Characters/i)).toBeDefined();
  })
});

