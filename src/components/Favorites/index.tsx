import React from "react";
import styles from "./styles.module.css";

const LOCAL_STORAGE_KEY = "favorites";

interface Props {
  id: string;
}

function Favorites({ id }: Props) {
  const [favorites, setFavorites] = React.useState<string[]>(() => {
    const valueInLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (valueInLocalStorage) {
      return JSON.parse(valueInLocalStorage);
    }
    return [];
  });

  const isFavorite = favorites.includes(id);

  function add() {
    const newFavorites = [...favorites, id];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  }

  function remove() {
    const newFavorites = favorites.filter((item) => item !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  }

  return (
    <aside className={styles.favorites}>
      <p className={styles.favoritesText}>
        {isFavorite
          ? "If you don't like this car anymore, click the button to remove it from your collection of favorite items."
          : "If you like this car, click the button and save it in your collection of favorite items."}
      </p>
      <div className={styles.favoritesButton}>
        <button type="button" onClick={isFavorite ? remove : add}>
          {isFavorite ? "Remove" : "Save"}
        </button>
      </div>
    </aside>
  );
}

export { Favorites };
