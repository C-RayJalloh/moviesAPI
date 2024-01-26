/* eslint-disable react/prop-types */

import Button from "./Button";
export default function MovieList({ isOpen1, onClick, movies, onSelection }) {
    return (
      <div className="box">
        <Button  onClick={onClick}>
          {isOpen1 ? "–" : "+"}
        </Button>
        {isOpen1 && (
          <ul className="list list-movies">
            {movies?.map((movie) => (
              <Movie key={movie.imdbID} movie={movie} onSelection={onSelection}  />
            ))}
          </ul>
        )}
      </div>
    );
  }
  
  function Movie({ movie,  onSelection }) {
    
    return (
      <li onClick={() => onSelection(movie.imdbID)}>
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