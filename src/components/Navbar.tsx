import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../services/ThemeContext";
import lightIcon from "/light.svg";
import darkIcon from "/dark.svg";
import heartIcon from "/heart.svg";
import marvelLogo from "/marvel.svg";
import "./Navbar.css";
import { useFavorites } from '../services/FavoritesContext';

const Navbar: React.FC = () => {
          const { theme, setTheme } = useTheme();
          const { filterFavorites, setFilterFavorites } = useFavorites();
          const { favorites } = useFavorites();
          return (
                    <nav className={theme === "dark" ? "aux-dark-mode" : ""}>
                              <Link to="/">
                                        <img
                                                  src={marvelLogo}
                                                  className={"logo"}
                                                  alt="Marvel logo"
                                        />
                              </Link>
                              <div>
                                        <div className="theme-toggle">
                                                  <button
                                                            type="button"
                                                            className={theme === "light" ? "show" : "hidden"}
                                                            aria-label="Use Dark Mode"
                                                            onClick={() => setTheme("dark")}
                                                  >
                                                            <img
                                                                      src={darkIcon}
                                                                      alt="Dark icon"
                                                            />
                                                  </button>
                                                  <button
                                                            type="button"
                                                            className={theme === "dark" ? "show" : "hidden"}
                                                            aria-label="Use Light Mode"
                                                            onClick={() => setTheme("light")}
                                                  >
                                                            <img
                                                                      src={lightIcon}
                                                                      alt="Light icon" />
                                                  </button>
                                        </div>
                                        <div>
                                                  <button
                                                                      type="button"
                                                                      aria-label="Use Favorites"
                                                                      onClick={() => setFilterFavorites(!filterFavorites)}
                                                                      >
                                                                      <img
                                                                                src={heartIcon}
                                                                                alt="Heart icon"
                                                                      />
                                                                      <p>{favorites.size}</p>
                                                  </button>
                                        </div>
                              </div>
                    </nav>
          );
};

export default Navbar;
