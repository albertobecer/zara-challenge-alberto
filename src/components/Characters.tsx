import React, { useState } from "react";
import useFetch from "../hooks/useFetch";

interface Character {
          id: number;
          name: string;
}

interface ApiResponse {
          loading: boolean;
          error: { message: string } | null;
          data: { results: Character[] } | null;
}

const Characters: React.FC = () => {
          const VITE_ENDPOINT_CHARACTERS = import.meta.env.VITE_ENDPOINT_CHARACTERS;
          const { loading, error, data } = useFetch<ApiResponse>(VITE_ENDPOINT_CHARACTERS);

          const [q, setQ] = useState<string>("");
          const [searchParam] = useState<string[]>(["name"]);

          function search(items: Character[]): Character[] {
                    return items.filter((item) => {
                              return searchParam.some((newItem) => {
                                        return (
                                                  item[newItem as keyof Character]
                                                            .toString()
                                                            .toLowerCase()
                                                            .indexOf(q.toLowerCase()) > -1
                                        );
                              });
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
                              {loading && <p>Loading...</p>}
                              {error && <p>Error: {error.message}</p>}
                              <br />
                              <ul>
                                        {data &&
                                                  search(data.results).map((character: Character) => (
                                                            <li key={character.id}>{character.name}</li>
                                                  ))}
                              </ul>
                    </>
          );
};

export default Characters;