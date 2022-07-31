import StarButton from "./StarButton";
import { useState,useContext,useEffect } from "react";
import { getBoards ,getStar } from "../api/apis";
import { ArrBoard } from "../context/arrBoard";

const WorkContent=(props)=>{

  const {arrBoard,setArrBoard}=useContext(ArrBoard);

  const [dataObj, setDataObj] = useState(null);


/*   useEffect(() => {
    const fetchWorkSpace = async () => {
      const result = await getStar();
      setDataObj(result);
      console.log(result,"result");
    }
  
    fetchWorkSpace()
  }, []); */
  

    return(
      <div 
      key={props.index}
      className="contentRow">
        <div className="contentRowImgDiv">
         <img src={props.item.obj.img} alt={props.item.obj.img} width="60px" height="50px"/>
        </div>
        <div className='contentRowInfoDivParent'>
        <div className="contentRowInfoDiv">
         <p className="contentRowInfoDivHead">
            {props.item.obj.title}
         </p>
         <p className="contentRowInfoDivSpaceName">
         {props.item.obj.workspaceName}
         </p>
        </div>
        <div className="starDiv">
        <StarButton
          dataObj={dataObj}
          setDataObj={setDataObj}
          val={props.item.obj}
        />
        </div>
        </div>
      </div>
    )
}
export default WorkContent;