import { useParams } from "react-router-dom";
import { useEffect,useContext, useState } from "react";
import { getBoards } from "../api/apis";
import { ArrBoard } from "../context/arrBoard";
import StarButton from "./StarButton";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

const Notes=()=>{

  
    const {workspace,title}=useParams();
    const {arrBoard,setArrBoard}=useContext(ArrBoard);
   const [obj,setObj]=useState({});
    
   
  //  boards data
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
    },  [ Object.values(arrBoard).length]) 
    
    return (
      <>
         <div className="notesDiv">
            <img  className="createImage" src={obj?.img} alt={obj?.img}/>
            <div className="buttonMenu">
              <button className="titleName">title</button>
               <StarButton
          val={obj}
               />
               <button className="workspaceNameNotes">{workspace}</button>
               <button className="btn"><PersonAddAltIcon/> Share</button>
            </div>
         </div>
      </>
    )
}
export default Notes;