import React from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../services/ThemeContext';
import { useFavorites } from '../services/FavoritesContext';
import { Link } from "react-router-dom";

const Character: React.FC = () => {
          const { id } = useParams<{ id: string }>() ?? { id: '' };
          const parsedId = parseInt(id ?? '');
          const { theme } = useTheme();
          const { favorites, toggleFavorite } = useFavorites();

          const favoriteCharacter = Array.from(favorites).find(fav => fav.id === parsedId);

          //TODO: Fake
          const character = favoriteCharacter || {
                    id: parsedId,
                    name: `Character ${id}`,
                    imageUrl: "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784.jpg"
          };

          return (
                    <>
                              <h1>{character.name}</h1>
                              <Link to="/">Volver</Link>
                              <button onClick={() => toggleFavorite(character)}>
                                        {favoriteCharacter ? 'Unfavorite' : 'Favorite'}
                              </button>
                              <img
                                        className={theme === "dark" ? "aux-dark-mode" : ""}
                                        src="http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784.jpg"
                                        alt="Character"
                              />
                              <br />
                    </>
          );
};

export default Character;