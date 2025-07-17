'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface FavoritesContextType {
    favoriteIds: string[];
    toggleFavorite: (id: string) => void;
    isFavorite: (id: string) => boolean;
    getFavoritesCount: () => number;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
    const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

    // Cargar favoritos desde localStorage al montar
    useEffect(() => {
        try {
            const savedFavorites = localStorage.getItem('favorites');
            if (savedFavorites) {
                const parsed = JSON.parse(savedFavorites);
                if (Array.isArray(parsed)) {
                    setFavoriteIds(parsed);
                }
            }
        } catch (error) {
            console.error('Error loading favorites:', error);
        }
    }, []);

    // Guardar favoritos en localStorage cuando cambien
    useEffect(() => {
        try {
            localStorage.setItem('favorites', JSON.stringify(favoriteIds));
        } catch (error) {
            console.error('Error saving favorites:', error);
        }
    }, [favoriteIds]);

    // Función para alternar favorito
    const toggleFavorite = (id: string) => {
        setFavoriteIds(prev => {
            const isFavorite = prev.includes(id);
            if (isFavorite) {
                return prev.filter(favId => favId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    // Función para verificar si una receta es favorita
    const isFavorite = (id: string) => {
        return favoriteIds.includes(id);
    };

    // Función para obtener la cantidad de favoritos
    const getFavoritesCount = () => {
        return favoriteIds.length;
    };

    return (
        <FavoritesContext.Provider value={{
            favoriteIds,
            toggleFavorite,
            isFavorite,
            getFavoritesCount
        }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites debe usarse dentro de FavoritesProvider');
    }
    return context;
}; 