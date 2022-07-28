import { useContext } from "react";
import "../App.css";
/* import { StarProvider } from "../context/start.context"; */
import {postStar , putStar , putBoard} from "../api/apis";
import { ArrBoard } from "../context/arrBoard";

const StarButton = (props) => {
/*   const {isStarred, setIsStarred} = useContext(StarProvider); */
  const {arrBoard,setArrBoard}=useContext(ArrBoard);

  const postData = async (event) => {
    putBoard({...arrBoard});
  };

  const handleActive = (e, val) => {
    if (val.starred === "false") {
/*     setIsStarred("true"); */
     val.starred = "true"; 
      e.target.className = "starColor";
    } else {
      /* setIsStarred("false"); */
       val.starred = "false";
      e.target.className = "star";
    }
    postData();
  };

  const handleStar = (item) => {
    if (props.dataObj) {
      console.log(props.dataObj,"props.dataObj");
      var prevItem = Object.values(props.dataObj).map((item) => {
         return item?.obj?.title; 
      });
    }

    let res = prevItem?.filter((i) => {
      return i === item.title;
    });

    let postStarred = {
      obj: item,
      post: "true",
    };
    if (res?.length > 0) {
      Object.values(props.dataObj).map((i) => {
        if (i?.obj?.title === item?.title) {
           i.post = "false"; 
        }
      });
      const newObj = Object.values(props.dataObj).filter((i) => {
         return i.post === "true"; 
      
      });
     console.log(newObj,"newObj before put");
      putStar(newObj);

    } else {

      props.setDataObj({ ...props.dataObj, ...postStarred });
     postStar(postStarred);

    }
  };

  return (
    <button
      onClick={(e) => {
        handleActive(e, props.val);
        handleStar(props.val);
      }}
      className={props.val.starred === "false" ? "star" : "starColor"}
    >
      ☆
    </button>
  );
};
export default StarButton;
