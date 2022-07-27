import React, { createContext, useState } from "react";

export const StarProvider = createContext();

export default function StarContextProvider({children}) {
  const [isStarred, setIsStarred] = useState(false);

  const value = {
    isStarred,
    setIsStarred,
  };
  return (
    <StarProvider.Provider value={value}>{children}</StarProvider.Provider>
  );
}

