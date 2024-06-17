import React from 'react';
import { Link } from 'react-router-dom';
import ButtonFavorite from './ButtonFavorite';
import './CharacterBox.css';

interface Character {
  id: number;
  name: string;
  description?: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

interface CharacterBoxProps {
  character: Character;
  favorites: Character[];
  toggleFavorite: (character: Character) => void;
  characterDescription?: boolean;
}

const CharacterBox: React.FC<CharacterBoxProps> = ({ character, favorites, toggleFavorite, characterDescription }) => {
  return (
    <div id="character-box">
      <div>
        <Link to={`/character/${character.id}`}>
          <h2>{character.name}</h2>
        </Link>
        <ButtonFavorite
          character={character}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      </div>
      {characterDescription ? <p>{character.description}</p> : null}
    </div>
  );
};

export default CharacterBox;
