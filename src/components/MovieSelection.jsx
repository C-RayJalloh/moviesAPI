/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import StarRating from './StarRating'
import Loader from "./Loader";

/* eslint-disable react/prop-types */
export default function MovieSelection({ Idselected, onClose, onAdd, watched, onSetRating }){
   // loading state for indication
    const [isLoading, setIsloading] = useState(null)

    const [movie, setMovie] = useState({});

   

    
    const isWatched = watched.map((movie) => movie.imdbID).includes(Idselected);
    const watchuserRating = watched.find(
      (movie) => movie.imdbID === Idselected
    )?.userRating;

   // object properties of the movie and set to the movie
    const {
      Title: title,
      Year: year,
      Poster: poster,
      Runtime: runtime,
      imdbRating,
      Plot: plot,
      Released: released,
      Actors: actors,
      Director: director,
      Genre: genre,
    } = movie;


    function handleAdd() {
      const newWatchlist = {
        imdbID: Idselected,
        title,
        year,
        poster,
        imdbRating: Number(imdbRating),
        runtime: Number(runtime.split(" ").at(0)),
      };

      onAdd(newWatchlist);
      onClose();
    }

     useEffect( function () {
        async function MovieDetails() {
          // indicate loading if the fetch delays
            setIsloading(true);
            const res = await fetch(`http://www.omdbapi.com/?apikey=50fa8b10&i=${Idselected}`);
           // grab the data from the response
            const data = await res.json();
            // update the movie object State
            setMovie(data);
            // disable the indicator after fetching the data
            setIsloading(false)
        }
        // call the function to execute it
        MovieDetails();
     },  // dependance array prop to change
     [Idselected]
     );

    return (
        <div className="details">
            {isLoading ? <Loader /> : (
            <>
            <header>
            <button  className="btn-back" onClick={onClose}>
                &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>{released} &bull; {runtime}</p>
              <p>{genre}</p>
              <p><span>
                ⭐️
              </span>
              {imdbRating} IMDb rating
              </p>
            </div>
            </header>

            <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={onSetRating}
                  />
                 
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                
                </>
              ) : (
                <p>
                  You rated this movie {watchuserRating} <span>⭐️</span>
                </p>
              )}
            </div>
                <p><em>{plot}</em></p>
                <p>Starring {actors}</p>
                <p>Directed by {director}</p>
            </section>
            </>
            )}
        </div>
    )
}