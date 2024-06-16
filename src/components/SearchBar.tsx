// SearchBar.tsx
import React from 'react';
import './SearchBar.css';
import search from '/search.svg';

interface SearchBarProps {
          q: string;
          setQ: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ q, setQ }) => {
          return (
                    <div className="search-container">
                              <div className="search-wrapper">
                                        <img
                                                  src={search}
                                                  alt="Search icon"
                                                  className="search-icon"
                                        />
                                        <input
                                                  type="search"
                                                  name="search-form"
                                                  placeholder="SEARCH A CHARACTER..."
                                                  value={q}
                                                  onChange={(e) => setQ(e.target.value)}
                                                  className="search-input"
                                        />
                              </div>
                              <div className="search-underline"></div>
                    </div>
          );
};

export default SearchBar;