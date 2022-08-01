import StarButton from "./StarButton";
import {Link} from "react-router-dom";

const WorkContent=(props)=>{

    return(
     <div className="starButtonDiv">
      <Link to={`/${props.item.workspaceName}/${props.item.title}`}>
      <div 
      key={props.index}
      className="contentRow">
      
        <div className="contentRowImgDiv">
         <img src={props.item.img} alt={props.item.img} width="60px" height="50px"/>
        </div>
        <div className='contentRowInfoDivParent'>
        <div className="contentRowInfoDiv">
         <p className="contentRowInfoDivHead">
            {props.item.title}
         </p>
         <p className="contentRowInfoDivSpaceName">
         {props.item.workspaceName}
         </p>
        </div>
        
        
        </div>
        </div>
      </Link>
      <div className="starDiv">
        <StarButton
          val={props.item}
        />
        </div>
        </div>
    )
}
export default WorkContent;