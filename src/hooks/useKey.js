import { useEffect } from "react";

export function useKey(Key, action){
   // EFFECT ON KEY PRESS WITH EVENT LISTENER
   useEffect(
    function () {
      // SPECIFY THE EFFECT
      function callback(e) {
        if (e.code.toLowerCase() === Key.toLowerCase()) {
          action();
          console.log("CLOSING");
        }
      }

      // LISTEN FOR THE EVENT
      document.addEventListener("keydown", callback);

      // CLEAN UP THE EVENT LISTENER
      return () => {
        document.removeEventListener("keydown", callback);
      };
    },
    [action, Key]
  );


}