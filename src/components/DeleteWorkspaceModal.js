import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useState } from "react";
import { ArrBoard } from "../context/arrBoard";
import { ArrWorkspace } from "../context/arr.context";
import { putBoard, putWorkspace } from "../api/apis";
import { useNavigate } from "react-router-dom";
import { deleteWorkspace } from "../api/apis";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: "auto",
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

const DeleteWorkspaceModal = (props) => {
  const navigate = useNavigate();

  const { arrWork, setArrWork } = useContext(ArrWorkspace);
  const { arrBoard, setArrBoard } = useContext(ArrBoard);

  const [btnPoint, setBtnPoint] = useState(true);

  const handleConfirmInput = (e) => {
    if (e.target.value === props.work) {
      setBtnPoint(false);
    } else if (e.target.value !== props.work) {
      setBtnPoint(true);
    }
  };

  const handleWorkspaceData = () => {
    console.log(arrWork, "ARrwork");
    console.log(arrBoard, "arrBoard");
    var searchWorkspaceBoard;
    for (const key in arrBoard) {
      if (key === props.work) {
        searchWorkspaceBoard = arrBoard[key];
        delete arrBoard[key];
      }
    }
    Object.values(searchWorkspaceBoard).map((item, index) => {
      deleteWorkspace(item.title);
    });
    putBoard(arrBoard);
    for (const key in arrWork) {
      if (arrWork[key].title === props.work) {
        delete arrWork[key];
      }
    }
    console.log(arrWork, "arrWork");
    putWorkspace(arrWork);
    navigate("/");
  };
  return (
    <>
      <Modal
        open={props.workOpen}
        onClose={props.handleWorkClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="deleteWorkspaceContent">
            <h2>Are you sure you want to delete {props.work}?</h2>
            <div className="deleteWorkspacePoints">
              <p>Things to know :</p>
              <ul>
                <li>This is permanent and can't be undone</li>
                <li>All boards in this Workspace will be closed.</li>
              </ul>
            </div>
            <p>Enter the Workspace name to delete</p>
            <div className="deleteForm">
              <input
                type="text"
                onChange={handleConfirmInput}
                placeholder={props.work}
              />
              <button
                disabled={btnPoint}
                className="deleteBtn"
                onClick={handleWorkspaceData}
              >
                Delete Workspace
              </button>
            </div>
            <button onClick={props.handleWorkClose} className="workspaceClose">
              <CloseIcon />
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
};
export default DeleteWorkspaceModal;
