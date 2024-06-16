import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { useFavorites } from '../services/FavoritesContext';
import './Characters.css';
import { Link } from 'react-router-dom';
import Loading from './Loading.tsx';
import SearchBar from './SearchBar.tsx'

interface Character {
          id: number;
          name: string;
          imageUrl: string;
}

interface ApiResponse {
          [x: string]: Character[] | null;
}

const Characters: React.FC = () => {
          const VITE_ENDPOINT_CHARACTERS = import.meta.env.VITE_ENDPOINT_CHARACTERS as string;
          const { favorites, toggleFavorite } = useFavorites();

          const [q, setQ] = useState<string>("");
          const [params, setParams] = useState<Record<string, string>>({});
          const [filteredResults, setFilteredResults] = useState<Character[]>([]);

          const { filterFavorites} = useFavorites();

          const { loading, error, data } = useFetch<ApiResponse>(VITE_ENDPOINT_CHARACTERS, params);

          useEffect(() => {
                    if (q) {
                              setParams({ nameStartsWith: q });
                    } else {
                              setParams({});
                    }
          }, [q]);

          useEffect(() => {
                    if (data && data.results) {
                              let results = data.results;
                              if (filterFavorites) {
                                        results = results.filter(character => Array.from(favorites).some(fav => fav.id === character.id));
                              }
                              setFilteredResults(searchFavorites(results, q));
                    } else if (filterFavorites) {
                              setFilteredResults(searchFavorites(Array.from(favorites), q));
                    } else {
                              setFilteredResults([]);
                    }
          }, [data, q, filterFavorites, favorites]);

          const searchFavorites = (items: Character[], query: string): Character[] => {
                    return items.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
          };

          return (
                    <>
                              {loading && <Loading />}
                              <SearchBar q={q} setQ={setQ} />
                              <p>{filteredResults.length} RESULTS</p>
                              {error && <p>Error: {error.message}</p>}
                              <br />
                              <ul>
                                        {filteredResults.map((character: Character) => (
                                                  <li key={character.id}>
                                                            <Link to={`/character/${character.id}`}>{character.name}</Link>
                                                            <button onClick={() => toggleFavorite(character)}>
                                                                      {Array.from(favorites).some(fav => fav.id === character.id) ? 'Unfavorite' : 'Favorite'}
                                                            </button>
                                                  </li>
                                        ))}
                              </ul>

                    </>
          );
};

export default Characters;
