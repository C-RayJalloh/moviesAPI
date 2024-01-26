import { useEffect, useState} from "react";

export function useMovie(query, callback) {

    const [movies, setMovies] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [error, setError] = useState("");

    const Key = "50fa8b10";

      // DATA FETCHING ON MOUNT USING THE ASYNC FUNCTION
  // MOVIE EFFECT THAT FETCHS MOVIES FROM THE API
  useEffect(() => {
     
    callback?.();

    // AN ABORT CONTROLLER
    const controller = new AbortController();

    async function FetchMovies() {
      try {
        setisLoading(true);
        setError("");

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${Key}&s=${query}`,
          // connect the controller with the fetch
          { signal: controller.signal }
        );

        // Handle API errors
        // if the response is not okay throw an error mssge
        if (!res.ok) {
          throw new Error("Something went wrong with fetching movies");
        }

        const data = await res.json();
        // if the data response is equal to false throw an error message
        if (data.Response === "False") {
          throw new Error("Movie not found");
        }

        setMovies(data.Search);
        console.log(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err.message);
          setError(err.message);
        }
      } finally {
        setisLoading(false);
      }
    }

    if (!query.length > 3) {
      setMovies([]);
      setError("");
      return;
    }

 
    FetchMovies();

    // return a clean up function
    return function () {
      controller.abort();
    };
  }, [query]); // Include 'query' in the dependency array to re-run the effect when 'query' changes

  return {movies, isLoading, error};

}