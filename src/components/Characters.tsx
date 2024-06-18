import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { useFavorites } from '../services/FavoritesContext';
import './Characters.css';
import Loading from './Loading';
import SearchBar from './SearchBar';
import CharacterMain from './CharacterMain';

interface Character {
          id: number;
          name: string;
          thumbnail: {
                    path: string;
                    extension: string;
          };
}

interface ApiResponse {
          results: Character[];
}

const Characters: React.FC = () => {
          const VITE_ENDPOINT_CHARACTERS = import.meta.env.VITE_ENDPOINT_CHARACTERS as string;
          const { favorites, toggleFavorite, filterFavorites } = useFavorites();

          const [q, setQ] = useState<string>("");
          const [params, setParams] = useState<Record<string, string>>({});
          const [filteredResults, setFilteredResults] = useState<Character[]>([]);

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
                              setFilteredResults(results);
                    } else if (filterFavorites) {
                              setFilteredResults(Array.from(favorites));
                    } else if (!q) {
                              setFilteredResults(data?.results || []);
                    }
          }, [data, q, filterFavorites, favorites]);

          useEffect(() => {
                    if (!q && !filterFavorites) {
                              setFilteredResults(data?.results || []);
                    } else if (!q && filterFavorites) {
                              setFilteredResults(Array.from(favorites));
                    }
          }, [q, filterFavorites, data, favorites]);

          return (
                    <>
                              {loading && <Loading />}
                              <section id="characters">
                                        <SearchBar q={q} setQ={setQ} filteredResultsLength={filteredResults.length} />
                                        {error && <p>Error: {error.message}</p>}
                                        <br />
                                        {filterFavorites && <h1>FAVORITES</h1>}
                                        <ul>
                                                  {filteredResults.map((character: Character) => (
                                                            <li key={character.id}>
                                                                      <CharacterMain key={character.id} character={character} toggleFavorite={toggleFavorite} favorites={favorites} />
                                                            </li>
                                                  ))}
                                        </ul>
                              </section>
                    </>
          );
};

export default Characters;
