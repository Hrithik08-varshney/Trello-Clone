import NoteAltIcon from "@mui/icons-material/NoteAlt";
import FilterFramesIcon from "@mui/icons-material/FilterFrames";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import React from "react";
import { useState } from "react";
import "../App.css";
import Modal from "./Modal";
import WorkspaceModal from "./WorkspaceModal";

const CreateButtonData = () => {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [workOpen, setWorkOpen] = useState(false);
  const handleWorkOpen = () => setWorkOpen(true);
  const handleWorkClose = () => setWorkOpen(false);

  const createBtnData = [
    {
      idName: "createBoard",
      icon: <NoteAltIcon />,
      name: "Create Board",
      para: " A board is made up of cards ordered on lists. Use it to manage projects, track information, or organize anything.",
      modalText: "Create Board",
    },
    {
      idName: "template",
      icon: <FilterFramesIcon />,
      name: "Start with a template",
      para: " Get started faster with a board template",
      modalText: "Create from template",
    },
    {
      idName: "createWorkspace",
      icon: <GroupAddIcon />,
      name: "Create Workspace",
      para: "A workspace is a group of boards and people. Use it to organise your company, side hustle, family, or friends.",
      modalText: "Create Workspace",
    },
  ];

  return (
    <div className="innerCreateButtons">
      {createBtnData.map((val) => {
        return (
          <>
            <button
              onClick={() => {
                if (`${val.name}` === "Create Board") {
                  handleOpen();
                } else {
                  handleWorkOpen();
                }
                setModalData(val.modalText);
              }}
              key={val.name}
              className="innerCreateButtonsCss"
              id={val.idName}
            >
              <div className="createButtonUpperDiv">
                <span className="cbticon">{val.icon}</span>
                <span className="cbtname">{val.name}</span>
              </div>
              <div className="createButtonLowerDiv">{val.para}</div>
            </button>
            <Modal
              open={open}
              handleClose={handleClose}
              modalData={modalData}
            />
            <WorkspaceModal
              workOpen={workOpen}
              handleWorkClose={handleWorkClose}
            />
          </>
        );
      })}
    </div>
  );
};
export default CreateButtonData;
