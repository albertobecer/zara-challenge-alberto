import React from 'react';
import { useTheme } from '../services/ThemeContext';
import heart from '/heart.svg';
import heartWhite from '/heart-white.svg';

interface Character {
          id: number;
          name: string;
          thumbnail: {
                    path: string;
                    extension: string;
          };
}

interface ButtonFavoriteProps {
          character: Character;
          favorites: Array<Character>;
          toggleFavorite: (character: Character) => void;
}

const ButtonFavorite: React.FC<ButtonFavoriteProps> = ({ character, favorites, toggleFavorite }) => {
          const { theme } = useTheme();
          const isFavorite = Array.from(favorites).some(fav => fav.id === character.id);

          return (
                    <button onClick={() => toggleFavorite(character)}>
                              {isFavorite ? (
                                        <img
                                                  src={heart}
                                                  alt="favorite"
                                                  className={theme === "dark" ? "aux-dark-mode heart-icon" : "heart-icon"}
                                        />
                              ) : (
                                        <img src={heartWhite} alt="Unfavorite" />
                              )}
                    </button>
          );
};

export default ButtonFavorite;
