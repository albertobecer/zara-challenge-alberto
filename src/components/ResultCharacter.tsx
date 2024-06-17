import React from 'react';
import { Link } from 'react-router-dom';
import './ResultCharacter.css'
import { useTheme } from '../services/ThemeContext';
import CharacterBox  from './CharacterBox';

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
          return (
                    <div id="result-character">
                              <Link to={`/character/${character.id}`}>
                                        <img 
                                                  className={theme === "dark" ? "aux-dark-mode cardimg" : "cardimg"}
                                                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`} 
                                                  alt={character.name} 
                                        />
                              </Link>
                               <CharacterBox 
                                                  character={character} 
                                                  favorites={Array.from(favorites)} 
                                                  toggleFavorite={toggleFavorite} 
                              />
                    </div>
          );
};

export default ResultCharacter;
