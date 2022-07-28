import AppBar from "../components/AppBar";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../App.css";
import { getWorkspaceByName } from "../api/apis";
import WorkspaceBoard from "../components/WorkspaceBoard";
import { ArrWorkspace } from "../context/arr.context";
import { useContext } from "react";
import { getWorkspace } from "../api/apis";
const Workspace = () => {
  const { workspace } = useParams();
  const { arrWork, setArrWork } = useContext(ArrWorkspace);
  const [desc, setDesc] = useState();
  const [arr, setArr] = useState([]);
  /*     const [objKeys, setObjKeys] = useState([]);
   */

  useEffect(() => {
    const fetchWorkSpace = async () => {
      const result = await getWorkspace();
      setArrWork(result);
      console.log(result, "result");
    };
    fetchWorkSpace().then(() => {
      console.log(arrWork, "arrWork");
      Object.values(arrWork).map((item,index)=>{
       if(item.title===workspace){
        setDesc(item.desc);
       }
      })
    });
  }, [desc]);

  useEffect(() => {
    const fetchWorkSpace = async () => {
      const result = await getWorkspaceByName(workspace); 
      /*   setObjKeys(Object.keys(result)); */
      setArr(result);
      console.log(result);
    };

    fetchWorkSpace();
  }, []);

  return (
    <>
      <AppBar />
      <div className="workspacePageHeadDiv">
        <div className="workspacePageHeading">
          <div className="workspacePageHeadingIcon">{workspace[0]}</div>
          <div className="workspacePageHeadingContent">
            <h2>{workspace}</h2>
            <button className="workspaceEditName">✏️</button>
          </div>
          <div className="workspaceDesc">
            {desc}
          </div>
        </div>
        <div className="workspacePageInvite">
          <button className="invite">
            <PersonAddAltIcon /> Invite Workspace Members
          </button>
        </div>
      </div>
      <div className="parentWorkspacePageBoards">
        <WorkspaceBoard arr={arr} />
      </div>
    </>
  );
};
export default Workspace;
