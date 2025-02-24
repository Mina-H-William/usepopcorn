import { useEffect, useState } from "react";

const key = "5f3c8812";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsloading(true);
          setError("");

          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${key}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) throw new Error("some went wrong with fetch movies");

          const data = await res.json();

          if (data.Response === "False") throw new Error("movies not found");

          setMovies(data.Search);
          setError("");
        } catch (err) {
          console.log(err.message);

          if (err.name !== "AbortError") setError(err.message);

          setMovies([]);
        } finally {
          setIsloading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      //   setSelectedId(null);
      fetchMovies();

      return () => {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
