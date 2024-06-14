import React from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../../services/ThemeContext';

const Character: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { theme } = useTheme();

  return (
    <>
      <h1>Character {id}</h1>
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