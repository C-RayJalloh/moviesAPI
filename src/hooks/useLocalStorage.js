import { useState, useEffect } from "react";

export function useLocalStorage(initialState, Key) {
     // GET THE LOCAL STORAGE OF WATCHED MOVIES BY USING A CALLBACK FUNCTION IN THE STATE
  const [value, setValue] = useState(() => {
    const storage = localStorage.getItem(Key);
    return storage ? JSON.parse(storage) : initialState; // Provide an empty array as the default value
  });

 // AN EFFECT WITH LOCAL DATA STORAGE FOR WATCHED MOVIES
 useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(value));
    },
    [value, Key]
  );

  return [value, setValue];

}