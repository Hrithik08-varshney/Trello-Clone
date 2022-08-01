import { useContext } from "react";
import "../App.css";

import { putBoard} from "../api/apis";
import { ArrBoard } from "../context/arrBoard";


const StarButton = (props) => {

   const {arrBoard,setArrBoard}=useContext(ArrBoard);

  const handleActive=(e,item)=>{
    console.log(item,"item");
    if (item.starred === "false") {
           item.starred = "true"; 
            e.target.className = "starColor";
          } else {
             item.starred = "false";
            e.target.className = "star";
          }
         for(const key in arrBoard){
          if(key===item.workspaceName){
          Object.values(arrBoard[key]).map((val)=>{
              if(val.title===item.title)
                 val.starred=item.starred;
          })
          }
         }
          console.log(arrBoard);
          putBoard(arrBoard);
  }
  return (
    <button
      onClick={(e) => {
        handleActive(e, props.val);
      }}
      className={props.val.starred === "false" ? "star" : "starColor"}
    >
      ☆
    </button>
  );
};
export default StarButton;