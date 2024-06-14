import {describe, test, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import App from './App.tsx'
import {BrowserRouter} from 'react-router-dom';
import { ThemeProvider } from './services/ThemeContext';


describe('Init', () => {
  test('Load page', () => {
    render(<BrowserRouter><ThemeProvider><App/></ThemeProvider></BrowserRouter>);
    expect(screen.findByText(/Characters/i)).toBeDefined();
  })
});

