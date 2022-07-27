import React, { createContext, useState } from "react";
export const ArrWorkspace =createContext();

export default function ArrWorkspaceFunc({children}){
  const [arrWork,setArrWork]=useState([]);
  const resObj={
    arrWork,
    setArrWork
  }
  return(
    <ArrWorkspace.Provider value={resObj}>
      {children}
    </ArrWorkspace.Provider>
  )
}