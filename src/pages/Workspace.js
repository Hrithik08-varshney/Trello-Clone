import AppBar from "../components/AppBar";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useNavigate, useParams } from "react-router-dom";
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
import DeleteWorkspaceModal from "../components/DeleteWorkspaceModal";
const Workspace = () => {
  const { workspace } = useParams();

  const { arrWork, setArrWork } = useContext(ArrWorkspace);
  const { arrBoard, setArrBoard } = useContext(ArrBoard);
  const [work, setWork] = useState(workspace);
  const [input, setinput] = useState(work);
  const [desc, setDesc] = useState();
  const [arr, setArr] = useState([]);
  const [click, setClick] = useState(false);

  const [workOpen, setWorkOpen] = useState(false);
  const handleWorkOpen = () => setWorkOpen(true);
  const handleWorkClose = () => setWorkOpen(false);
  const navigate = useNavigate();

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


    var searchWorkspace;
    for (var key in arrBoard) {
      if (key === workspace) {
        searchWorkspace=arrBoard[input];
        arrBoard[input] = arrBoard[key];
        delete arrBoard[key];
        Object.values(arrBoard[input]).map((item) => {
          item.workspaceName = input;
        });
      }
      putBoard(arrBoard);
    }
    navigate(`/${input}`);

  };

  useEffect(() => {
    setWork(workspace);
  }, [workspace]);

  const handleInput = (e) => {
    setinput(e.target.value);
  };

  useEffect(() => {
    const fetchBoard = async () => {
      const res = await getBoards();
      setArrBoard(res);
    };

    fetchBoard();
  }, []);

  useEffect(() => {
    console.log("I am here")  
    Object.values(arrWork)?.map((item, index) => {
      if (item.title === workspace) {
        setDesc(item.desc);
      }
    });
  }, [arrWork, workspace, navigate]);

  //for description
  useEffect(() => {
    const fetchWorkSpace = async () => {
      const result = await getWorkspace();
      setArrWork(result);
    };

    fetchWorkSpace();
  }, []);

  //for workspace data
  useEffect(() => {
    const fetchWorkSpace = async () => {
      const result = await getWorkspaceByName(workspace);
      setArr(result);
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
      <div className="deleteWorkspaceDiv">
        <button onClick={handleWorkOpen} className="deleteWorkBtn">
          Delete this workspace ?
        </button>
        <DeleteWorkspaceModal
          work={work}
          workOpen={workOpen}
          handleWorkClose={handleWorkClose}
        />
      </div>
    </>
  );
};
export default Workspace;
