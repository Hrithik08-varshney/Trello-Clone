import ScheduleIcon from '@mui/icons-material/Schedule';
import AddIcon from '@mui/icons-material/Add';
import ModalComp from './Modal';
import { useState } from 'react';
import "../App.css";

const RightPanel=()=>{
    const [open, setOpen] = useState(false);
    const [modalData, setModalData] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
         <div className="rightContent">
         <div className="recently">
         <div>
         <ScheduleIcon className='recentlyIcon'/>
         </div>
         <div className='recentlyTitle'>
         Recently Viewed
         </div>
          
         </div>
         <div className='recentlyPara'>

         </div>
         <div onClick={() => {
                handleOpen();
                setModalData("Create Board");
              }}
         className='rightLink'>
            <button className='rightAddWorkspace'><AddIcon/></button>
            <div className='rightTitle'>Create a board</div>
         </div>
         <ModalComp 
            open={open}
            handleClose={handleClose}
            modalData={modalData}
            />
         </div>
        
            
    )
}
export default RightPanel;