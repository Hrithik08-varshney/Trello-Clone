import { useState } from "react";
import Modal from "./Modal";
import Card from "./workspace/card.component";
const WorkspaceBoard = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(props.arr, props, "WorkspaceBoards");
  return props.arr ? (
    <div className="workspacePageBoards">
      {Object.values(props?.arr)?.map((item, index) => {
        return (
          <Card
            key={index}
            path={`/${item.workspaceName}/${item.title}`}
            title={item.title}
            img={item.img}
            item={item}
          />
        );
      })}
    </div>
  ) : (
    <div className="workspacePageBoards">
      <div className="conditionCreate">
        <button onClick={handleOpen} className="createButtonDiv">
          Create A Board
        </button>
        <Modal open={open} handleClose={handleClose} modalData="Create Board" />
      </div>
    </div>
  );
};
export default WorkspaceBoard;
