import React from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from './services/ThemeContext';
import { useContext } from 'react';

const Character: React.FC = () => {
  const { id } = useParams();
  const theme = useContext(ThemeContext);
  return (
    <>
      <h1>Character {id}</h1>
      <img
        className={theme === "dark" ? "aux-dark-mode": ""}
        src="http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784.jpg"
        alt="Character"
      />
      <br/>
    </>
  );
};

export default Character;
