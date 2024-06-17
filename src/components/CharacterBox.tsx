import React from 'react';
import { Link } from 'react-router-dom';
import ButtonFavorite from './ButtonFavorite';
import './CharacterBox.css';

interface Character {
          id: string;
          name: string;
}

interface CharacterBoxProps {
          character: Character;
          favorites: Character[];
          toggleFavorite: (character: Character) => void;
}

const CharacterBox: React.FC<CharacterBoxProps> = ({ character, favorites, toggleFavorite }) => {
          return (
                    <div id="character-box">
                              <Link to={`/character/${character.id}`}>
                                        <h2>{character.name}</h2>
                              </Link>
                              <ButtonFavorite
                                        character={character}
                                        favorites={favorites}
                                        toggleFavorite={toggleFavorite}
                              />
                    </div>
          );
};

export default CharacterBox;
