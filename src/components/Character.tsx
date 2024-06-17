import React from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../services/ThemeContext';
import { useFavorites } from '../services/FavoritesContext';
import useFetch from "../hooks/useFetch";
import Loading from './Loading';
import CharacterBox from './CharacterBox';
import Comics from './CharacterComics';
import './Character.css';

interface Thumbnail {
  path: string;
  extension: string;
}

interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: Thumbnail;
}

interface CharacterData {
  results: Character[];
}

const Character: React.FC = () => {
  const { id } = useParams<{ id: string }>() ?? { id: '' };
  const parsedId = parseInt(id ?? '');
  const { theme } = useTheme();
  const { favorites, toggleFavorite } = useFavorites();

  const VITE_ENDPOINT_CHARACTER = import.meta.env.VITE_ENDPOINT_CHARACTER as string;
  const VITE_ENDPOINT_KEY = import.meta.env.VITE_ENDPOINT_KEY as string;
  const infoCharacter = useFetch<CharacterData>(`${VITE_ENDPOINT_CHARACTER}${parsedId}${VITE_ENDPOINT_KEY}`, {});

  if (infoCharacter.loading) {
    return <Loading />;
  }

  if (infoCharacter.error) {
    return <p>Error: {infoCharacter.error.message}</p>;
  }

  if (infoCharacter.data && infoCharacter.data.results.length > 0) {
    const character = infoCharacter.data.results[0];
    return (
      <>
        <section id="character">
          <div>
            <img
              className={theme === "dark" ? "aux-dark-mode" : ""}
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={`${character.name} Character`}
            />
            <CharacterBox
              character={character}
              favorites={Array.from(favorites)} // Convertir Set a Array
              toggleFavorite={toggleFavorite}
            />
          </div>
        </section>
        <Comics characterid={character.id} />
      </>
    );
  }

  return null;
};

export default Character;
