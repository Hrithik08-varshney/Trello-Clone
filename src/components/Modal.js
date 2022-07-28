import React from "react";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import "../App.css";
import { useState } from "react";
import VisibilityAccordian from "./VisibilityAccordian";
import { Modal } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect , useContext} from "react";
import { getWorkspace } from "../api/apis";
import { ArrWorkspace } from "../context/arr.context";

const ModalComp = (props) => {
  
  const [urlTitle,setUrlTitle]=useState();
  const [urlVal,setUrlVal]=useState("");
  const { setArrWork} = useContext(ArrWorkspace);

  useEffect(() => {
    const fetchWorkSpace = async () => {
      const result = await getWorkspace();
      setArrWork(result);
    }
  
    fetchWorkSpace()
  }, []);
  const modalstyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const Images = [
    {
      image: require("../assets/backgroundImages/dirtRoad.jpg"),
      alt: "dirtRoad",
    },
    {
      image: require("../assets/backgroundImages/logoTen.jpg"),
      alt: "logoTen",
    },
    { image: require("../assets/backgroundImages/sea.jpg"), alt: "sea" },
    {
      image: require("../assets/backgroundImages/waterfall.jpg"),
      alt: "waterfall",
    },
  ];

  const [divImage, setDivImage] = useState(Images[0].image);
  const handleImage = (e) => {
    setBackData({ ...backData, img: e.target.src });
    setDivImage(e.target.src);
  };

  const [backData, setBackData] = useState({
    img: Images[0].image,
    title: "",
    workspaceName: "",
    starred:"false"
  });

  const inputChange = (e) => {
    setBackData({ ...backData, title: e.target.value });
    setUrlTitle(e.target.value);
  };

  const postData = async (event) => {
    const { img, title, workspaceName,starred} = backData; //object destructuring

    if (img && title && workspaceName && starred ) {
      const res = fetch(
        `https://trello-9063b-default-rtdb.asia-southeast1.firebasedatabase.app/boardData/${backData.workspaceName}.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            img,
            title,
            workspaceName,
            starred
          }),
        }
      );
      if (res) {
        setBackData({
          img: Images[0].image,
          title: "",
          workspaceName: "",
          starred:"false"
        });
      }
    }
  };
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalstyle}>
        <div className="modalHeading">
          <div className="modalTitle">{props.modalData}</div>
          <div className="modalIcon">
            <CloseIcon onClick={props.handleClose} />
          </div>
        </div>
        <div className="modalData">
          <div className="imageDiv">
            <div>
              <img
                className="imageDivShow"
                src={divImage}
                alt="divImage"
                width="200px"
                height="100px"
              />
            </div>
          </div>
          <div className="backgroundTitle">Background</div>
          <div className="backgroundImages">
            {Images.map((item, index) => {
              return (
                <img
                  onClick={handleImage}
                  className="backgroundImg"
                  key={index}
                  src={item.image}
                  alt={item.alt}
                  width="80px"
                  height="50px"
                />
              );
            })}
          </div>
          <div className="colorImages"></div>
          <div className="formDiv">
            <div className="formInputDiv">
              <div className="backgroundTitle">Board Title</div>
              <input
                onChange={inputChange}
                className="backgroundInput"
                type="text"
                id="boardName"
                name="boardName"
                required
              />
            </div>
            <div className="formInputDiv">
              <div className="backgroundTitle">Workspace</div>

              <VisibilityAccordian
                backData={backData}
                setBackData={setBackData}
                title="Select A Workspace"
               // data={arr}
                setUrlVal={setUrlVal}
              />
            </div>
            <div className="createModalButtonSection">
              <Link
                className="createButtonSubmit"
                onClick={postData}
                exact="true"
                to={{
                  pathname: `/${urlVal}/${urlTitle}`,
                }}
              >
                Create
              </Link>
              <button className="templateButtonSubmit">
                Start with a template
              </button>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
export default ModalComp;
