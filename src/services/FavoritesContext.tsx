import React, { createContext, useContext, useState, ReactNode } from 'react';


interface Character {
          id: number;
          name: string;
          thumbnail: {
                    path: string;
                    extension: string;
          };
}


interface FavoritesContextType {
    favorites: Set<Character>;
    toggleFavorite: (character: Character) => void;
    filterFavorites: boolean;
    setFilterFavorites: (filter: boolean) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<Set<Character>>(new Set());
    const [filterFavorites, setFilterFavorites] = useState<boolean>(false);

    const toggleFavorite = (character: Character) => {
        setFavorites((prevFavorites) => {
            const newFavorites = new Set(prevFavorites);
            const existingFavorite = Array.from(newFavorites).find(fav => fav.id === character.id);
            if (existingFavorite) {
                    newFavorites.delete(existingFavorite);
                } else {
                    newFavorites.add(character);
                }
            return newFavorites;
        });
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, filterFavorites, setFilterFavorites}}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = (): FavoritesContextType => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};
