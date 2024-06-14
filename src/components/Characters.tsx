import React from "react";
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
  const characters = useFetch<ApiResponse>(VITE_ENDPOINT_CHARACTERS);

  return (
    <>
      {characters.loading && <p>Loading...</p>}
      {characters.error && <p>Error: {characters.error.message}</p>}
      <br />

      <ul>
        {characters.data?.results.map((character: Character) => (
          <li key={character.id}>{character.name}</li>
        ))}
      </ul>
    </>
  );
};

export default Characters;
