import NoteAltIcon from "@mui/icons-material/NoteAlt";
import FilterFramesIcon from "@mui/icons-material/FilterFrames";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import WorkspaceModal from "./WorkspaceModal";
import { useState } from "react";
import "../App.css";
import Accordian from "./Accordian";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ArrWorkspace } from "../context/arr.context";


const Leftpanel = (props) => {

  const {arrWork, setArrWork} = useContext(ArrWorkspace);

  const [workOpen, setWorkOpen] = useState(false);
  const handleWorkOpen = () => setWorkOpen(true);
  const handleWorkClose = () => setWorkOpen(false);
  const createLeftPanel = [
    {
      idName: "leftBoards",
      icon: <NoteAltIcon />,
      name: "Boards",
      to: "/boards",
    },
    {
      idName: "leftTemplate",
      icon: <FilterFramesIcon />,
      name: "Template",
      to: "/templates",
    },
    {
      idName: "home",
      icon: <HomeIcon />,
      name: "Home",
      to: "/",
    },
  ];
  return (
    <>
      <div className="leftContent">
        {createLeftPanel.map((val, index) => {
          return (
            <div key={index} id={val.idName}>
              <NavLink
                className="leftLinks"
                exact="true"
                activeclassname="active"
                to={val.to}
              >
                <div className="leftLinkIcon">{val.icon}</div>
                <div className="leftLinkTitle">{val.name}</div>
              </NavLink>
            </div>
          );
        })}
        <div className="leftLinksWorkspace">
          <div className="leftWorkspace">Workspaces</div>

          <button onClick={handleWorkOpen} className="leftAddWorkspace">
            <AddIcon />
          </button>
        </div>
        <WorkspaceModal workOpen={workOpen} handleWorkClose={handleWorkClose} />
        <div className="leftBottomContent">
        {arrWork?Object.values(arrWork).map((item, index) => {
            return <Accordian key={index} titleName={item.title} />;
          }):null
          }
        </div>
      </div>
    </>
  );
};
export default Leftpanel;


