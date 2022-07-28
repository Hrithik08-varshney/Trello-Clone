import { Link } from "react-router-dom";
import { useContext } from "react";
import StarButton from "./StarButton";
import { ArrStar } from "../context/arrStar";
import { useState } from "react";
import Modal from "./Modal";
const WorkspaceBoard=(props)=>{

  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    const {arrStar,setArrStar}=useContext(ArrStar);
    return props.arr?(
        <div className="workspacePageBoards">
          {Object.values(props?.arr)?.map((item,index)=>{
                 return(
                    <div key={index} className="linkDiv">
              <Link
                to={`/${item.workspaceName}/${item.title}`}
                className="fetchedContent"
              >
                <p>{item.title}</p>
                <img
                  className="fetchedContentImg"
                  src={item.img}
                  alt={item.img}
                  width="200px"
                  height="100px"
                />
              </Link>
              <StarButton
                val={item}
                dataObj={arrStar}
                setDataObj={setArrStar}
              />

            </div>
                 )
          })}
        </div>
    ):
    <div className="workspacePageBoards">
    <div className="conditionCreate">
    <button 
    onClick={handleOpen}
    className="createButtonDiv">
    Create A Board
    </button>
    <Modal 
            open={open}
            handleClose={handleClose}
            modalData="Create Board"
            />
      
    </div>
    </div>
}
export default WorkspaceBoard;