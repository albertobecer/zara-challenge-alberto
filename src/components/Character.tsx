import React from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../services/ThemeContext';
import { useFavorites } from '../services/FavoritesContext';
import useFetch from "../hooks/useFetch";
import Loading from './Loading.tsx';
import "./Character.css";
import ButtonFavorite from './ButtonFavorite';

interface CharacterData {
  results: Array<{
    id: number;
    name: string;
    thumbnail: {
      path: string;
      extension: string;
    };
  }>;
}

const Character: React.FC = () => {
          const { id } = useParams<{ id: string }>() ?? { id: '' };
          const parsedId = parseInt(id ?? '');
          const { theme } = useTheme();
          const { favorites, toggleFavorite } = useFavorites();

          const VITE_ENDPOINT_CHARACTER = import.meta.env.VITE_ENDPOINT_CHARACTER as string;
          const VITE_ENDPOINT_KEY = import.meta.env.VITE_ENDPOINT_KEY as string;
          const infoCharacter = useFetch<CharacterData>(`${VITE_ENDPOINT_CHARACTER}${parsedId}${VITE_ENDPOINT_KEY}`, {});

          return (
                    <>
                              {infoCharacter && infoCharacter.loading && <Loading />}
                              <section id="character">
                                        {infoCharacter && infoCharacter.error && <p>Error</p>}
                                        {infoCharacter && infoCharacter.data && infoCharacter.data.results && (
                                                  <>
                                                            <img
                                                                      className={theme === "dark" ? "aux-dark-mode" : ""}
                                                                      src={`${infoCharacter.data.results[0].thumbnail.path}.${infoCharacter.data.results[0].thumbnail.extension}`}
                                                                      alt={`${infoCharacter.data.results[0].name} Character `}
                                                            />
                                                            <h1>{infoCharacter.data.results[0].name}</h1>
                                                            <ButtonFavorite character={infoCharacter.data.results[0]} favorites={favorites} toggleFavorite={toggleFavorite} />
                                                            <br />
                                                  </>
                                        )}
                              </section>
                    </>
          );
};

export default Character;