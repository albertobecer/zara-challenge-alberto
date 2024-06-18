import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CharacterBox from './CharacterBox';
import { ThemeProvider } from '../services/ThemeContext';

interface Character {
          id: number;
          name: string;
          description?: string;
          thumbnail: {
                    path: string;
                    extension: string;
          };
}

const mockToggleFavorite = vi.fn();

const mockCharacter: Character = {
          id: 1011334,
          name: "3-D Man",
          description: "A character description",
          thumbnail: {
                    path: "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784",
                    extension: "jpg"
          }
};

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

describe('CharacterBox Component', () => {
          test('renders character name and link', () => {
                    renderWithProviders(
                              <CharacterBox
                                        character={mockCharacter}
                                        favorites={[]}
                                        toggleFavorite={mockToggleFavorite}
                                        characterDescription={true}
                              />
                    );

                    const characterLink = screen.getByText(/3-D Man/i);
                    expect(screen.findByText(/3-D Man/i)).not.toBeNull();
                    expect(characterLink.closest('a')?.getAttribute('href')).toBe('/character/1011334');
          });

          test('renders character description if characterDescription is true', () => {
                    renderWithProviders(
                              <CharacterBox
                                        character={mockCharacter}
                                        favorites={[]}
                                        toggleFavorite={mockToggleFavorite}
                                        characterDescription={true}
                              />
                    );
                    expect(screen.findByText(/A character description/i)).not.toBeNull();
          });

          test('does not render character description if characterDescription is false', () => {
                    renderWithProviders(
                              <CharacterBox
                                        character={mockCharacter}
                                        favorites={[]}
                                        toggleFavorite={mockToggleFavorite}
                                        characterDescription={false}
                              />
                    );

                    expect(screen.queryByText(/A character description/i)).toBeNull();
          });

          test('renders ButtonFavorite and handles toggleFavorite', () => {
                    renderWithProviders(
                              <CharacterBox
                                        character={mockCharacter}
                                        favorites={[]}
                                        toggleFavorite={mockToggleFavorite}
                                        characterDescription={true}
                              />
                    );

                    const favoriteButton = screen.getByRole('button');
                    fireEvent.click(favoriteButton);

                    expect(mockToggleFavorite).toHaveBeenCalledWith(mockCharacter);
          });
});
