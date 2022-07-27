import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height:550,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius:"5px",
  boxShadow: 24,
  p: 4,
};

export default function WorkspaceModal(props) {

  const [workObj,setWorkObj]=useState({
    title:"",
    desc:""
  })

     const handleTitle=(e)=>{
          setWorkObj({...workObj,  title:e.target.value});
     }
     const handleDesc=(e)=>{
      setWorkObj({...workObj, desc:e.target.value});
     }

     const postData = async (event) => {
      console.log("working");
      props.handleWorkClose();
      const {title , desc } = workObj; //object destructuring
  
      if (title && desc) {
        const res = fetch(
          "https://trello-9063b-default-rtdb.asia-southeast1.firebasedatabase.app/workspace.json",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title,
              desc,
            }),
          }
        );
        if (res) {
          setWorkObj({
            title:"",
            desc:""
          });
        }
      }
    };
  return (
    <div>
      <Modal
        open={props.workOpen}
        onClose={props.handleWorkClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='workspaceMain'>
            <div className='formWorkspace'>
               <div className='formWorkspaceTitle'>
                <h1>Let's build a Workspace</h1>
                <p>Boost your production by making it easier for everyone to access boards in one location.</p>
               </div>
                <div className='formContent'>
                 <div className='formRow'>
                <label for="name">Workspace Name</label>
                <input onChange={handleTitle}
                classname="workspaceInput" type="text" id="name" name="workspaceName"/>
                 </div>
                 <div className='formRow'>
                <label for="desc">Workspace Description</label>
                <textarea onChange={handleDesc} classname="workspaceInput" type="text" id="desc" name="workspaceDesc" row="15"/>
                 </div>
                 <button onClick={postData} className='workspaceBtn'>Continue</button>
                </div>
            </div>
            
          <button 
          onClick={props.handleWorkClose} className='workspaceClose'><CloseIcon/></button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
