import { useContext, useEffect, useState } from "react";
import WorkspaceButton from "./WorkspaceButton";
import BoardContent from "./BoardsContent";
import StarContextProvider, { StarProvider } from "../context/start.context";
import {getBoards} from "../api/apis"
import { ArrBoard } from "../context/arrBoard";

const BoardRightPanel = () => {
  const {arrBoard,setArrBoard}=useContext(ArrBoard);
  const [objKeys, setObjKeys] = useState([]);
/*   const {isStarred, setIsStarred} = useContext(StarProvider)
 */
/*   console.log(isStarred, "ISSTARRED") */
  
  useEffect(() => {
    const fetchBoards = async () => {
      const result = await getBoards();
      if(result!=null || undefined){
        setObjKeys(Object.keys(result));
        setArrBoard(result);
      }
    }
  
    fetchBoards();
  }, []);

  return (
    <div className="boardRightPanel">
      <div className="boardRecentlyView"></div>
      <div className="workspaceBoards">
        <h1>Your Workspaces</h1>
        <div className="yourWorkspaceData"> 
        {arrBoard?
          Object.values(arrBoard)?.map((item, index) => {
            return (
              <div key={index} className="yourWorkspaceDataDiv">
                <div className="yourWorkspaceHeadingDiv">
                  <div className="yourWorkspaceHeading">{objKeys[index]}</div>
                  <div className="yourWorkspaceHeadingButton">
                    <WorkspaceButton 
                      objKeysIndex={objKeys[index]}
                    />
                  </div>
                </div>
                <BoardContent
                  objKeys={objKeys}
                  index={index}
                  item={item}
                />
              </div>
            );
          }):null}

        </div>
      </div>
    </div>
  );
};
export default BoardRightPanel;