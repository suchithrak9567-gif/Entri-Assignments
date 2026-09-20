import { createContext, useContext, useState } from "react";

const FavouritesContext = createContext();

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState([]);

  function addFavourite(recipe) {
    setFavourites((prev) => {
      const alreadySaved = prev.some(
        (item) => item.idMeal === recipe.idMeal
      );

      if (alreadySaved) {
        return prev;
      }

      return [...prev, recipe];
    });
  }

  function removeFavourite(id) {
    setFavourites((prev) =>
      prev.filter((recipe) => recipe.idMeal !== id)
    );
  }

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addFavourite,
        removeFavourite,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  return useContext(FavouritesContext);
}