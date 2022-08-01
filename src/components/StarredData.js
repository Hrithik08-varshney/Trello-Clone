 import WorkContent from "./WorkContent";
 import { useContext, useState } from "react";
 import {getBoards} from "../api/apis";
 import { useEffect } from "react";
 import { ArrBoard } from "../context/arrBoard";


const StarredData = () => {

  const {arrBoard,setArrBoard}=useContext(ArrBoard);
  const [obj,setObj]=useState([]);

  useEffect(() => {
    const fetchBoards = async () => {
      const result = await getBoards();
      if(result!=null || undefined){
        setArrBoard(result);
      }
    }
  
    fetchBoards();
  }, []);

  useEffect(() => {
    Object.values(arrBoard).map((item,index)=>{
        return (
          Object.values(item).map((val,valIndex)=>{
              if(val.starred==="true")
           obj.push(val);
          })
        )
    })
  },[])
  
   return obj ? (
    <div className="workPopDataContent">
      {obj?.map((item, index) => {
           return (

              <WorkContent 
              key={index}
               item={item} index={index} />
            
          ); 
        })}
    </div>
  ) : null;

  
};
export default StarredData;
