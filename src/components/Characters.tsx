import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { useFavorites } from '../services/FavoritesContext';
import './Characters.css';
import Loading from './Loading.tsx';
import SearchBar from './SearchBar.tsx'
import CharacterMain from './CharacterMain.tsx';

interface Character {
          id: number;
          name: string;
          thumbnail: {
                    path: string;
                    extension: string;
          };
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
          return items.filter(item => {
            const { name, thumbnail } = item;
            return name.toLowerCase().includes(query.toLowerCase()) && thumbnail;
          });
        };

          return (
                    <>
                              {loading && <Loading />}
                              <section id="characters">
                                        <SearchBar q={q} setQ={setQ} filteredResultsLength={filteredResults.length} />
                                        {error && <p>Error: {error.message}</p>}
                                        <br />
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
