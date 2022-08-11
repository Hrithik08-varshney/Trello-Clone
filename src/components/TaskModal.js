import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import ListAltIcon from '@mui/icons-material/ListAlt';
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
            <div className="listHeading">
            {
                console.log(props.val,props.item,props.valIndex)
            }
               {/*  <ListAltIcon/> {
                    props.val.list
                } */}
            </div>
            </div>
        <button 
          onClick={props.handleTaskClose} className='workspaceClose'><CloseIcon/></button>
        </Box>
      </Modal>
    </div>
  );
};
