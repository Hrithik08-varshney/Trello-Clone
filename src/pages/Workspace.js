import AppBar from "../components/AppBar";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../App.css";
import { getWorkspaceByName, putBoard } from "../api/apis";
import WorkspaceBoard from "../components/WorkspaceBoard";
import { ArrWorkspace } from "../context/arr.context";
import { useContext } from "react";
import { getWorkspace } from "../api/apis";
import { putWorkspace } from "../api/apis";
import { getBoards } from "../api/apis";
import { ArrBoard } from "../context/arrBoard";
const Workspace = () => {
  const { workspace } = useParams();

  const { arrWork, setArrWork } = useContext(ArrWorkspace);
  const [work, setWork] = useState(workspace);
  const [input, setinput] = useState(workspace);
  const [desc, setDesc] = useState();
  const [arr, setArr] = useState([]);
  const [click, setClick] = useState(false);

  const handleEdit = () => {
    setClick(!click);
  };

  const setWorkFunc = () => {
    setWork(input);
    setClick(false);
    Object.values(arrWork).map((item, index) => {
      if (item.title === workspace) {
        item.title = input;
      }
    });
    putWorkspace(arrWork);

    for (var key in arrBoard) {
      if (key === workspace) {
        arrBoard[input] = arrBoard[key];
        delete arrBoard[key];
      }
      putBoard(arrBoard);
    }
  };

  const handleInput = (e) => {
    setinput(e.target.value);
  };

  //for board data change

  const { arrBoard, setArrBoard } = useContext(ArrBoard);

  useEffect(() => {
    const fetchBoard = async () => {
      const res = await getBoards();
      setArrBoard(res);
    };

    fetchBoard();
  }, []);


  useEffect(() => {
    console.log(arrWork, "ARRAY")
    Object.values(arrWork)?.map((item, index) => {
      if (item.title === workspace) {
        setDesc(item.desc);
      }
    });
  }, [arrWork]);

  //for description
  useEffect(() => {
    const fetchWorkSpace = async () => {
      const result = await getWorkspace();
      setArrWork(result);
      console.log(result, "workspace data");
    };

    fetchWorkSpace();

  }, []);


  //for workspace data
  useEffect(() => {
    const fetchWorkSpace = async () => {
      const result = await getWorkspaceByName(workspace);
      setArr(result);
      console.log(result, "board data by name");
    };

    fetchWorkSpace();
  }, [workspace]);

  return (
    <>
      <AppBar />
      <div className="workspacePageHeadDiv">
        <div className="workspacePageHeading">
          <div className="workspacePageHeadingIcon">{work[0]}</div>
          <div className="workspacePageHeadingContent">
            {click ? (
              <div className="changeWorkName">
                <input
                  className="inputWork"
                  type="text"
                  defaultValue={workspace}
                  onChange={handleInput}
                />
                <div className="changeWorkNameButton">
                  <button className="changeWorkNameBtn" onClick={setWorkFunc}>
                    Save
                  </button>
                  <button
                    className="changeWorkNameBtn"
                    onClick={() => setClick(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="work">
                <h2>{work}</h2>
                <button onClick={handleEdit} className="workspaceEditName">
                  ✏️
                </button>
              </div>
            )}
          </div>
          <div className="workspaceDesc">{desc}</div>
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
