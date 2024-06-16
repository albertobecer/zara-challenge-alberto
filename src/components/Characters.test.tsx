import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import Characters from './Characters';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../services/ThemeContext';
import { FavoritesProvider } from '../services/FavoritesContext';

// Define types for the fetch response
type FetchMock = ReturnType<typeof vi.fn>;

interface FetchResponse {
          ok: boolean;
          json: () => Promise<{
                    loading: boolean;
                    error: string | null;
                    data: { results: { id: number; name: string; }[] } | null;
          }>;
}

beforeEach(() => {
          global.fetch = vi.fn();
          cleanup();
});

afterEach(() => {
          vi.resetAllMocks();
});

describe('Characters Component', () => {
          test('renders loading message initially', async () => {
                    (global.fetch as FetchMock).mockResolvedValueOnce({
                              ok: true,
                              json: async () => ({
                                        loading: true,
                                        error: null,
                                        data: null
                              }),
                    } as FetchResponse);

                    render(
                              <BrowserRouter>
                                        <ThemeProvider>
                                                  <FavoritesProvider>
                                                            <Characters />
                                                  </FavoritesProvider>
                                        </ThemeProvider>
                              </BrowserRouter>
                    );

          });

          test('displays characters after loading', async () => {
                    (global.fetch as FetchMock).mockResolvedValueOnce({
                              ok: true,
                              json: async () => ({
                                        loading: false,
                                        error: null,
                                        data: {
                                                  results: [
                                                            {
                                                                      id: 1011334,
                                                                      name: "3-D Man",
                                                                      thumbnail: {
                                                                                path: "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784",
                                                                                extension: "jpg"
                                                                      },
                                                            },
                                                            {
                                                                      id: 1017100,
                                                                      name: "A-Bomb (HAS)",
                                                                      thumbnail: {
                                                                                path: "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784",
                                                                                extension: "jpg"
                                                                      },
                                                            }
                                                  ]
                                        }
                              }),
                    } as FetchResponse);
                    render(
                              <BrowserRouter>
                                        <ThemeProvider>
                                                  <FavoritesProvider>
                                                            <Characters />
                                                  </FavoritesProvider>
                                        </ThemeProvider>
                              </BrowserRouter>
                    );

                    expect(await screen.findByText(/3-D Man/i)).not.toBeNull();
                    expect(await screen.findByText(/A-Bomb \(HAS\)/i)).not.toBeNull();
          });

          test('displays error message on fetch failure', async () => {
                    (global.fetch  as FetchMock).mockRejectedValueOnce(new Error('API is down'));

                    render(
                              <BrowserRouter>
                                        <ThemeProvider>
                                                  <FavoritesProvider>
                                                            <Characters />
                                                  </FavoritesProvider>
                                        </ThemeProvider>
                              </BrowserRouter>
                    );

                    expect(await screen.findByText(/Error: API is down/i)).not.toBeNull();
          });
});
