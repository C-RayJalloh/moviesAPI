/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import MovieList from './MovieList';
import MovieWatchedList from './MovieWatchedList';
import { useState } from 'react';
import MovieSelection from './MovieSelection';
import Loader from './Loader';

export default function Main({ movies, loading, errMsge, Idselected, onSelection, onClose }) {
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);

  const [watched, setWatched] = useState([]);
  const [ userRating, setUserRaing ] = useState('');
  

  function addtoWatch(movie){
    setWatched((watched) => [...watched, movie]);

  }

  function handleClick1() {
    setIsOpen1((open) => !open);
  }

  function handleClick2() {
    setIsOpen2((open) => !open);
  }


  return (
    <>
      <div className="main">
        {loading && <Loader />}
        {!loading && !errMsge && (
          <MovieList movies={movies} isOpen1={isOpen1} onClick={handleClick1} onSelection={onSelection} />
        )}
        {errMsge && <Error Msge={errMsge} />}

        {/** <MovieWatchedList
          watched={watched}
          isOpen2={isOpen2}
          onClick={handleClick2}
        /> */}
        {Idselected ? ( <MovieSelection onAdd={addtoWatch} Idselected={Idselected} onClose={onClose} watched={watched} onSetRating={setUserRaing} /> ) : (
          <MovieWatchedList
          watched={watched}
          isOpen2={isOpen2}
          onClick={handleClick2}
          movie={movies}
        />
        )}
       
      </div>
    </>
  );
}



function Error({ Msge }){
  return <p className="error"><span>🚫</span> {Msge}</p>
}