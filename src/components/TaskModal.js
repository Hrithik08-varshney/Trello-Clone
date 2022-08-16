import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useContext } from "react";
import { ListName } from "../context/listName";
import DescriptionIcon from "@mui/icons-material/Description";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachmentIcon from '@mui/icons-material/Attachment';
import DeleteIcon from '@mui/icons-material/Delete';
import ListBtnPopper from "./ListBtnPopper";
import LabelsData from "./LabelsData";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 550,
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export const TaskModal = (props) => {

  const btnData=[
    {
     icon:<BookmarkBorderIcon/>,
     title:"Labels",
     innerData:<LabelsData/>
    },
    {
      icon:<CheckBoxIcon/>,
      title:"Checklist"
     },
     {
      icon:<AccessTimeIcon/>,
      title:"Dates"
     },
     {
      icon:<AttachmentIcon/>,
      title:"Attachment"
     },
     {
      icon:<DeleteIcon/>,
      title:"Delete"
     }

  ]
  const { listName } = useContext(ListName); //listName for modal

  return (
    <div>
      <Modal
        open={props.taskModalOpen}
        onClose={props.handleTaskClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="boxContent">
          <div className="listBoxLeftData">
            <div className="listHeading">
              <div className="listHeadingIcon">
                {" "}
                <ListAltIcon />{" "}
              </div>
              <div className="listHeadingTitle">{listName.list}</div>
            </div>
            <div className="listTags">{/* due dates , labvels  */}</div>
            <div className="listDescription">
              <div className="listHeading">
                <div className="listHeadingIcon">
                  <DescriptionIcon />
                </div>
                <div className="listHeadingTitle">Description</div>
              </div>
              <div className="listDescriptionInput">
              <textarea cols="65" rows="5" placeholder="Add a more detailed description.."></textarea>
              </div>
            </div>
          </div>
          <div className="listBoxRightData">
            <div className="rightBtns">
            <h4>Add to Card</h4>
            {
              btnData.map((item,index)=>{
                 return (
                  <ListBtnPopper
                  index={index}
                    itemIcon={item.icon}
                    itemTitle={item.title}
                  >
                    {item.innerData}
                  </ListBtnPopper>
                 )
              })
            }
            </div>
          </div>
          </div>
          
          <button onClick={props.handleTaskClose} className="workspaceClose">
            <CloseIcon />
          </button>
        </Box>
      </Modal>
    </div>
  );
};


/* btnData.map((item,index)=>{
                 return (
                  <div key={index} className="rightDivBtn">
                  <div className="rightDivBtnIcon">{item.icon}</div>
                  <div className="rightDivBtnTitle">{item.title}</div>
                  </div>
                 )
              }) */