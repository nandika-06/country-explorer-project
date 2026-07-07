import { useCallback, useEffect, useState } from "react";

const FAV_KEY = "ge_favourites";

function readFavourites(): string[] {
  try {
    const raw = localStorage.getItem(FAV_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
}

export function useFavourites() {
  const [favourites, setFavourites] = useState<string[]>(() =>
    readFavourites(),
  );

  useEffect(() => {
    localStorage.setItem(FAV_KEY, JSON.stringify(favourites));
  }, [favourites]);

  const isFavourite = useCallback(
    (code: string) => favourites.includes(code),
    [favourites],
  );

  const addFavourite = useCallback((code: string) => {
    setFavourites((prev) => (prev.includes(code) ? prev : [...prev, code]));
  }, []);

  const removeFavourite = useCallback((code: string) => {
    setFavourites((prev) => prev.filter((c) => c !== code));
  }, []);

  const toggleFavourite = useCallback((code: string) => {
    setFavourites((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code],
    );
  }, []);

  return {
    favourites,
    isFavourite,
    addFavourite,
    removeFavourite,
    toggleFavourite,
  };
}
