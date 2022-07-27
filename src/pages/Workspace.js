import AppBar from "../components/AppBar";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BoardContent from "../components/BoardsContent";
import "../App.css";
const Workspace=()=>{
    const [arr,setArr]=useState([]);
    const [objKeys, setObjKeys] = useState([]);
    useEffect(() => {
       const res=fetch(
        `https://trello-9063b-default-rtdb.asia-southeast1.firebasedatabase.app/boardData/${workspace}.json`
      ).then((response) => response.json())
      .then((data) => {
        setObjKeys(Object.keys(data));
       setArr(data);
      });
       
    }, [])
    
    const {workspace}=useParams();
    console.log(workspace,typeof(workspace));
    return(
      <>
        <AppBar/>
        <div className="workspacePageHeadDiv">
        <div className="workspacePageHeading">
          <div className="workspacePageHeadingIcon">
            {workspace[0]}
          </div>
          <div className="workspacePageHeadingContent">
          <h2>{workspace}</h2>
          <button className="workspaceEditName">✏️</button>
          </div>
        </div>
        <div className="workspacePageInvite">
          <button className="invite">
            <PersonAddAltIcon/> Invite Workspace Members
          </button>
        </div>
        </div>
        <div className="workspacePageBoards">
           <BoardContent
             arr={arr}
                  objKeys={objKeys}
                  // index={index}
                  // item={item}
           />
        </div>
      </>
    )
}
export default Workspace;