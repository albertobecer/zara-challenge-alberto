import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../services/ThemeContext";
import lightIcon from "/light.svg";
import darkIcon from "/dark.svg";
import marvelLogo from "/marvel.svg";

const Navbar: React.FC = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const isCharacterPage = /^\/character\/\d+$/.test(location.pathname);

  return (
    <nav className={theme}>
      <img
        src={marvelLogo}
        className={theme === "dark" ? "logo aux-dark-mode" : "logo"}
        alt="Marvel logo"
      />

      <ul>
        {location.pathname !== "/" && (
          <li>
            <Link to="/">Characters</Link>
          </li>
        )}
        {!isCharacterPage && (
          <li>
            <Link to="/character/1">Character</Link>
          </li>
        )}
      </ul>
      <div className="theme-toggle">
        <button
          type="button"
          className={theme === "light" ? "show" : "hidden"}
          aria-label="Use Dark Mode"
          onClick={() => setTheme("dark")}
        >
          <img
            src={darkIcon}
            className={theme === "dark" ? "logo aux-dark-mode" : "logo"}
            alt="Dark icon"
          />
        </button>
        <button
          type="button"
          className={theme === "dark" ? "show" : "hidden"}
          aria-label="Use Light Mode"
          onClick={() => setTheme("light")}
        >
          <img src={lightIcon} className={"logo"} alt="Light icon" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
