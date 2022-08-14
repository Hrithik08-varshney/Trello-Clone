import React, { createContext, useState } from "react";
export const ListName =createContext();

export default function ListNameFunc({children}){
  const [listName,setListName]=useState([]);
  const resObj={
    listName,
    setListName
  }
  return(
    <ListName.Provider value={resObj}>
      {children}
    </ListName.Provider>
  )
}