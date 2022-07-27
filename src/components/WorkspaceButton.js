import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group'; 
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import "../App.css";
const WorkspaceButton=()=>{
    const buttondata=[
        {
            idName:"leftBoards",
            icon:<NoteAltIcon/>,
            name:"Boards"
          },
          {
            idName:"leftMember",
            icon:<GroupIcon/>,
           name:"Members"
            },
            {
                idName:"leftSettings",
                icon:<SettingsIcon/>,
                name:"Settings"
                 }
    ]
    return (
    <>
      {
        buttondata.map((item,val)=>{
           return(
            <button key={val}
            className='workspaceButtonClass'>
                <p>{item.icon}</p>
                <p className='workspaceButtonClassPara'>{item.name}</p>
            </button>
           )
        })
      }
    </>
    )
}
export default WorkspaceButton;