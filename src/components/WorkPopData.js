import { Link } from "react-router-dom";
import { useContext,useEffect } from "react";
import { getWorkspace } from "../api/apis";
import { ArrWorkspace } from "../context/arr.context";

const WorkPopData=()=>{
    const {arrWork, setArrWork} = useContext(ArrWorkspace);

  useEffect(() => {
    const fetchWorkSpace = async () => {
      const result = await getWorkspace();
      setArrWork(result);
      console.log(result);
    }
  
    fetchWorkSpace()
  }, []);
    return (
     <div className="workPopData">
        <p className="title">Your Workspaces</p>
        <div className="workPopDataContent">
            {
                Object.values(arrWork).map((item,index)=>{
                    return(
                        <Link 
                         to={`/${item.title}`}
                        key={index}
                        className="workPopRow">
                         <div className="workPopRowIcon">{item.title[0]}</div>
                         <div className="workPopRowTitle">
                         {item.title}
                         </div>
                          
                        </Link>
                    )
                })
            }
        </div>
     </div>
    )
}
export default WorkPopData;