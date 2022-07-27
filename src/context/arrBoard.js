import React, { createContext, useState } from "react";
export const ArrBoard =createContext();

export default function ArrBoardFunc({children}){
  const [arrBoard,setArrBoard]=useState([]);
  const resObj={
    arrBoard,
    setArrBoard
  }
  return(
    <ArrBoard.Provider value={resObj}>
      {children}
    </ArrBoard.Provider>
  )
}