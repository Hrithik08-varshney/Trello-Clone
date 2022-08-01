import ScheduleIcon from "@mui/icons-material/Schedule";
import AddIcon from "@mui/icons-material/Add";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ModalComp from "./Modal";
import { useState } from "react";
import "../App.css";
import { ArrBoard } from "../context/arrBoard";
import { useContext } from "react";
import WorkContent from "./WorkContent";
import { useEffect } from "react";

const RightPanel = () => {
  const { arrBoard } = useContext(ArrBoard);
  const [obj, setObj] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState("");

  useEffect(() => {
   Object.values(arrBoard).map((item, index) => {
      return Object.values(item).map((val, valIndex) => {
        if (val.starred === "true") {
          setObj((pre) => {
            return [...pre, val];
          });
        }
      });
    });
  }, [ Object.values(arrBoard).length]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="rightContent">
      {obj && obj.length ? (
        <div className="rightContentStarData">
          <div className="rightContentStarDataTitle">
            <div className="StarDataTitleIcon">
              <StarBorderIcon />
            </div>
            <div className="rightContentStarData">
            Starred
            </div>
          </div>
          <div className="rightContentStarContent">
            {obj?.map((item, index) => {
              return <WorkContent key={index} item={item} index={index} />;
            })}
          </div>
        </div>
      ) : null}
      <div className="recently">
        <div>
          <ScheduleIcon className="recentlyIcon" />
        </div>
        <div className="recentlyTitle">Recently Viewed</div>
      </div>
      <div className="recentlyPara"></div>
      <div
        onClick={() => {
          handleOpen();
          setModalData("Create Board");
        }}
        className="rightLink"
      >
        <button className="rightAddWorkspace">
          <AddIcon />
        </button>
        <div className="rightTitle">Create a board</div>
      </div>
      <ModalComp open={open} handleClose={handleClose} modalData={modalData} />
    </div>
  );
};
export default RightPanel;
