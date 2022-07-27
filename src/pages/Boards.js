import AppBar from "../components/AppBar";
import Leftpanel from "../components/LeftPanel";
import { useContext,useEffect } from "react";
import BoardRightPanel from "../components/BoardRightPanel";
import { getWorkspace } from "../api/apis";
import { ArrWorkspace } from "../context/arr.context";

const Boards=()=>{
  const { setArrWork} = useContext(ArrWorkspace);

  useEffect(() => {
    const fetchWorkSpace = async () => {
      const result = await getWorkspace();
      setArrWork(result);
    }
  
    fetchWorkSpace()
  }, []);
    return (
        <>
          <AppBar/>
          <div className="boardsMain">
            <Leftpanel
            />
            <BoardRightPanel/>
          </div>
        </>

    )
}
export default Boards;