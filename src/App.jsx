/* eslint-disable no-undef */
/* eslint-disable no-empty-pattern */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import Star from "./Star";
import { useMovie } from "./hooks/useMovie";
import { useKey } from "./hooks/useKey";
import { useLocalStorage } from "./hooks/useLocalStorage";

// AN ARRAY OF OBJECT - STATIC DATA
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

// AN ARRAY OF OBJECT - STATIC DATA
const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);



export default function App() {
 
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovie(query);

  const [ watched, setWatched ] = useLocalStorage([], "watched")

 
  const Tempquery = "avengers";

 


  function HandleSelect(id) {
    setSelectedId((currid) => (id === currid ? null : id));
  }

  function HandleBtnClose() {
    setSelectedId(null);
  }

  function handleAdd(newWatchList) {
    setWatched((currWatchList) => [...currWatchList, newWatchList]);
  }

  function handleDelete(id) {
    setWatched((currwatched) =>
      currwatched.filter((movie) => movie.imdbID !== id)
    );
  }

 


  return (
    <>
      <NavBar>
        <Logo />
        <SearchBar query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </NavBar>

      <Main>
        <Toggle>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} HandleSelect={HandleSelect} />
          )}
          {error && <ErrorMgs message={error} />}
        </Toggle>

        <Toggle>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              handleBtnClose={HandleBtnClose}
              handleAdd={handleAdd}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList watched={watched} handleDEL={handleDelete} />
            </>
          )}
        </Toggle>
      </Main>
    </>
  );
}

function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function SearchBar({ query, setQuery }) {
  // CREATE A REFERENCE FOR THE INPUT ELEMENT
  const inputEL = useRef(null);

  useKey("Enter", function (){
    if (document.activeElement === inputEL.current) return;
    inputEL.current.focus();
    setQuery("");
  });



  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        ref={inputEL}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </>
  );
}

function NumResult({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

// COMPONENT COMPOSITION - COMBINING DIFFERENT COMPONENTS USING THE CHILDREN PROP
function Toggle({ children }) {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <>
      <div className="box">
        <button
          className="btn-toggle"
          onClick={() => setIsOpen1((open) => !open)}
        >
          {isOpen1 ? "–" : "+"}
        </button>
        {isOpen1 && children}
      </div>
    </>
  );
}

function MovieList({ movies, HandleSelect }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} HandleSelect={HandleSelect} />
      ))}
    </ul>
  );
}

function Movie({ movie, HandleSelect }) {
  return (
    <li onClick={() => HandleSelect(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieDetails({ selectedId, handleBtnClose, handleAdd, watched }) {
  const [details, setDetails] = useState({});
  const [isLoading, setisLoading] = useState(true);
  const [userRating, setUserRating] = useState("");

  const Key = "50fa8b10";

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot,
    Released,
    Actors,
    Director,
    Genre,
  } = details;

  // NEW OBJECT FOR A MOVIE TO BE ADDED TO THE WATCHLIST
  function onAdd() {
    const newWatchList = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };

    handleAdd(newWatchList);
    handleBtnClose();
  }
  
  useKey("Escape", handleBtnClose);
 
  // FETCHING THE MOVIE DETAILS FROM THE API WITH A useEFFECT
  useEffect(() => {
    async function getmovieDetails() {
      setisLoading(true);
      const res = await fetch(
        `https://www.omdbapi.com/?i=${selectedId}&apikey=${Key}`
      );

      const data = await res.json();
      setDetails(data);
      setisLoading(false);
    }
    getmovieDetails();
  }, [selectedId]);

  // CHANGING THE PAGE TITLE TO THE SELECTED MOVIE
  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      // A CLEAN UP FUNCTION RETURNED FROM THE EFFECT
      return function cleanup() {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  return (
    <>
      <div className="details">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <header>
              <button className="btn-back" onClick={handleBtnClose}>
                &larr;{" "}
              </button>
              <img src={poster} alt={`Poster ${details} movie`} />
              <div className="details-overview">
                <h2>{title}</h2>
                <p>
                  {Released} &bull; {runtime}
                </p>
                <p>{Genre}</p>
                <p>
                  <span>⭐️</span> {imdbRating} IMDB rating
                </p>
              </div>
            </header>
            <section>
              <div className="rating">
                {!isWatched ? (
                  <>
                    <Star maxRating={5} size={24} onSetRating={setUserRating} />
                    {userRating > 0 && (
                      <button className="btn-add" onClick={onAdd}>
                        + Add to list
                      </button>
                    )}
                  </>
                ) : (
                  <p>
                    You rated this movie with {watchedUserRating}{" "}
                    <span>⭐️</span>
                  </p>
                )}
              </div>
              <p>
                <em>{Plot}</em>
              </p>
              <p>Starring {Actors}</p>
              <p>Directed by {Director}</p>
            </section>
          </>
        )}
      </div>
    </>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>Imdb Rating⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>Your Ratings🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedList({ watched, handleDEL }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie key={movie.imdbID} movie={movie} handleDel={handleDEL} />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, handleDel }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button className="btn-delete" onClick={() => handleDel(movie.imdbID)}>
          ❌
        </button>
      </div>
    </li>
  );
}
// Loading component
function Loader() {
  return <p className="loader">Loading...</p>;
}

// ErrorMgs  message component
function ErrorMgs({ message }) {
  return (
    <p className="error">
      <span>🚫</span>
      {message}
    </p>
  );
}
