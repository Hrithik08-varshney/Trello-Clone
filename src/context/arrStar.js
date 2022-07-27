import React, { createContext, useState } from "react";
export const ArrStar =createContext();

export default function ArrStarFunc({children}){
  const [arrStar,setArrStar]=useState([]);
  const resObj={
    arrStar,
    setArrStar
  }
  return(
    <ArrStar.Provider value={resObj}>
      {children}
    </ArrStar.Provider>
  )
}