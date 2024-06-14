import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useFavorites } from '../../services/FavoritesContext';
import './Characters.css';
import { Link } from 'react-router-dom';

interface Character {
          id: number;
          name: string;
}

interface ApiResponse {
          [x: string]: Character[] | null;
}

const Characters: React.FC = () => {
          const VITE_ENDPOINT_CHARACTERS = import.meta.env.VITE_ENDPOINT_CHARACTERS as string;
          const { loading, error, data } = useFetch<ApiResponse>(VITE_ENDPOINT_CHARACTERS);
          const { favorites, toggleFavorite } = useFavorites();
          const [filterFavorites, setFilterFavorites] = useState<boolean>(false);

          const [q, setQ] = useState<string>("");
          const [searchParam] = useState<string[]>(["name"]);

          const search = (items: Character[]): Character[] => {
                    return items.filter((item) => {
                              const matchesSearch = searchParam.some((param) => {
                              return (
                                        item[param as keyof Character]
                                        .toString()
                                        .toLowerCase()
                                        .includes(q.toLowerCase())
                              );
                              });
                              const isFavorite = favorites.has(item.id);
                              return matchesSearch && (!filterFavorites || isFavorite);
                    });
           }

          return (
                    <>
                              <input
                                        type="search"
                                        name="search-form"
                                        placeholder="Buscar..."
                                        value={q}
                                        onChange={(e) => setQ(e.target.value)}
                              />
                              <input
                                        type="checkbox"
                                        checked={filterFavorites}
                                        onChange={() => setFilterFavorites(!filterFavorites)}
                              />
                              {loading && <p>Loading...</p>}
                              {error && <p>Error: {error.message}</p>}
                              <br />
                              <ul>
                                        {data && data.results && search(data.results).map((character: Character) => (
                                                  <li key={character.id}>
                                                            <Link to={`/character/${character.id}`}>{character.name}</Link>
                                                            <button onClick={() => toggleFavorite(character.id)}>
                                                                      {favorites.has(character.id) ? 'Unfavorite' : 'Favorite'}
                                                            </button>
                                                  </li>
                                        ))}
                              </ul>
                    </>
          );
};

export default Characters;
