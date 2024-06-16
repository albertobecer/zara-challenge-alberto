import React from 'react';
import { Link } from 'react-router-dom';
import heart from '/heart.svg';
import heartWhite from '/heart-white.svg';
import './ResultCharacter.css'
import { useTheme } from '../services/ThemeContext';

interface Character {
          id: number;
          name: string;
          thumbnail: {
                    path: string;
                    extension: string;
          };
}

interface ResultCharacterProps {
          character: Character;
          favorites: Set<Character>;
          toggleFavorite: (character: Character) => void;
}

const ResultCharacter: React.FC<ResultCharacterProps> = ({ character, favorites, toggleFavorite }) => {
          const { theme } = useTheme();
          console.log(theme)
          return (
                    <div className="card">
                              <img 
                                        className={theme === "dark" ? "aux-dark-mode" : ""}
                                        src={`${character.thumbnail.path}.${character.thumbnail.extension}`} 
                                        alt={character.name} 
                              />
                              <div>
                                        <Link to={`/character/${character.id}`}>
                                                  <h2>{character.name}</h2>
                                        </Link>
                                        <button onClick={() => toggleFavorite(character)}>
                                                  {Array.from(favorites).some(fav => fav.id === character.id) ?
                                                  <img src={heart} alt="favorite" className={theme === "dark" ? "aux-dark-mode heart-icon" : "heart-icon"} />
                                                  :
                                                  <img src={heartWhite} alt="Unfavorite" />
                                                  }
                                        </button>
                              </div>
                    </div>
          );
};

export default ResultCharacter;
