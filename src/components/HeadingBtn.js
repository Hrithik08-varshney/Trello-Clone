import "../App.css";
import CloseIcon from '@mui/icons-material/Close';
const HeadingBtn=(props)=>{
    
    return (
        <div className='create-heading'>
                     {props.name}
                     <span className="cross-btn-div">
        <button className="cross-btn" onClick={props.func}><CloseIcon/></button>
       </span>
     </div>
        
    )
}
export default HeadingBtn;
