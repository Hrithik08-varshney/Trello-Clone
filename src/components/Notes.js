import { useParams } from "react-router-dom";
import { useEffect,useContext, useState } from "react";
import { getBoards } from "../api/apis";
import { ArrBoard } from "../context/arrBoard";

const Notes=()=>{
    const {workspace,title}=useParams();
    const {arrBoard,setArrBoard}=useContext(ArrBoard);
   const [obj,setObj]=useState({});
     
  useEffect(() => {
    const fetchWorkSpace = async () => {
      const result = await getBoards();
      if(result!=null || undefined){
        setArrBoard(result);
      }
    }
    fetchWorkSpace();
},[])

     useEffect(()=>{
       /* console.log(Object.values(arrBoard)); */
      Object.values(arrBoard).map((item,index)=>{
        
        return (
            Object.values(item).map((val,valIndex)=>{
                     if(val.title===title)
                     {
                        setObj({...val});
                     }
            })
        )
      })
    },[arrBoard])
    
    return (
      <>
         <div>
            <img  className="createImage" src={obj?.img} alt={obj?.img}/>
         </div>
      </>
    )
}
export default Notes;