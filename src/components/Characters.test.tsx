import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import Characters from './Characters';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../services/ThemeContext';

beforeEach(() => {
          global.fetch = vi.fn();
          cleanup();
});

afterEach(() => {
          vi.resetAllMocks();
});

describe('Characters Component', () => {
          test('renders loading message initially', async () => {
                    global.fetch.mockResolvedValueOnce({
                              ok: true,
                              json: async () => ({
                                        loading: true,
                                        error: null,
                                        data: null
                              }),
                    });

                    render(
                              <BrowserRouter>
                                        <ThemeProvider>
                                                  <Characters />
                                        </ThemeProvider>
                              </BrowserRouter>
                    );

                    // Check the initial loading state
                    expect(await screen.findByText(/Loading/i)).not.toBeNull();
          });

          test('displays characters after loading', async () => {
                    global.fetch.mockResolvedValueOnce({
                              ok: true,
                              json: async () => ({
                                        loading: false,
                                        error: null,
                                        data: {
                                                  results: [
                                                            {
                                                                      id: 1011334,
                                                                      name: "3-D Man",
                                                            },
                                                            {
                                                                      id: 1017100,
                                                                      name: "A-Bomb (HAS)",
                                                            }
                                                  ]
                                        }
                              }),
                    });

                    render(
                              <BrowserRouter>
                                        <ThemeProvider>
                                                  <Characters />
                                        </ThemeProvider>
                              </BrowserRouter>
                    );

                    await screen.findByText(/Loading/i);

                    expect(await screen.findByText(/3-D Man/i)).not.toBeNull();
                    expect(await screen.findByText(/A-Bomb \(HAS\)/i)).not.toBeNull();
          });

          test('displays error message on fetch failure', async () => {
                    global.fetch.mockRejectedValueOnce(new Error('API is down'));

                    render(
                              <BrowserRouter>
                                        <ThemeProvider>
                                                  <Characters />
                                        </ThemeProvider>
                              </BrowserRouter>
                    );

                    expect(await screen.findByText(/Loading/i)).not.toBeNull();

                    expect(await screen.findByText(/Error: API is down/i)).not.toBeNull();
          });
});
