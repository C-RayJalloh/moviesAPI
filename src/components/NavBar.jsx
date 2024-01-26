/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useState } from "react"

export default function NavBar({movies, query, setquery }){
    return (
        <nav className="nav-bar">
           <Logo />
           <SearchBar query={query} setQuery={setquery} />
           <Results movies={movies} />
        </nav>
    )
}

// LOGO COMPONENT
function Logo() {
  return (
    <h1 className="logo">
      <span>🍿 usePopcorn</span>
    </h1>
  );
}

// SEARCH BAR COMPONENT
function SearchBar({ query, setQuery }) {
 

  return (
    <input
      className="search"
      type="text"
      value={query}
      placeholder="Enter movie title"
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

// RESULTS COMPONENT
function Results({movies}) {
  return <p className="num-results">Found <strong>{movies.length}</strong> results</p>;
}