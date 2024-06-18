import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CharacterMain from './CharacterMain';
import { ThemeProvider } from '../services/ThemeContext';

interface Character {
          id: number;
          name: string;
          thumbnail: {
                    path: string;
                    extension: string;
          };
}

const mockToggleFavorite = vi.fn();

const mockCharacter: Character = {
          id: 1011334,
          name: "3-D Man",
          thumbnail: {
                    path: "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784",
                    extension: "jpg"
          }
};

const mockFavorites = new Set<Character>([mockCharacter]);

beforeEach(() => {
          cleanup();
});

afterEach(() => {
          vi.resetAllMocks();
});

const renderWithProviders = (ui: React.ReactElement) => {
          return render(
                    <BrowserRouter>
                              <ThemeProvider>
                                        {ui}
                              </ThemeProvider>
                    </BrowserRouter>
          );
};

describe('CharacterMain Component', () => {
          test('renders character image and link', async () => {
                    renderWithProviders(
                              <CharacterMain
                                        character={mockCharacter}
                                        favorites={mockFavorites}
                                        toggleFavorite={mockToggleFavorite}
                              />
                    );

                    expect(screen.findByText(/3-D Man/i)).not.toBeNull();
                    const characterImage = screen.getByAltText(/3-D Man/i);
                    expect(characterImage).not.toBeNull();
          });

          test('renders CharacterBox and handles toggleFavorite', async () => {
                    renderWithProviders(
                              <CharacterMain
                                        character={mockCharacter}
                                        favorites={mockFavorites}
                                        toggleFavorite={mockToggleFavorite}
                              />
                    );

                    const favoriteButton = screen.getByRole('button');
                    fireEvent.click(favoriteButton);

                    expect(mockToggleFavorite).toHaveBeenCalledWith(mockCharacter);
          });
});
