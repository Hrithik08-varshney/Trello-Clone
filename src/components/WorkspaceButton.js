import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group'; 
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { Link } from 'react-router-dom';
import "../App.css";
const WorkspaceButton=(props)=>{
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
            <Link 
            to={`/${props?.objKeysIndex}`}
            key={val}
            className='workspaceButtonClass'>
                <p>{item.icon}</p>
                <p className='workspaceButtonClassPara'>{item.name}</p>
            </Link>
           )
        })
      }
    </>
    )
}
export default WorkspaceButton;