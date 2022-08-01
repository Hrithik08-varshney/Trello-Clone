import "../App.css";
import AppBar from "../components/AppBar";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";
import { useContext, useEffect } from "react";
import { getWorkspace } from "../api/apis";
import { ArrWorkspace } from "../context/arr.context";
import { ArrBoard } from "../context/arrBoard";
import { getBoards } from "../api/apis";
import  HomeImg from "../assets/HomeImg.png"
function App() {
  
  const { arrWork,setArrWork} = useContext(ArrWorkspace);

  const {arrBoard,setArrBoard}= useContext(ArrBoard);


  useEffect(() => {
    const fetchBoards = async () => {
      const result = await getBoards();
      if(result!=null || undefined){
        setArrBoard(result);
      }
    }
  
    fetchBoards();
  }, []);

  useEffect(() => {
    const fetchWorkSpace = async () => {
      const result = await getWorkspace();
      setArrWork(result);
    }
    
    fetchWorkSpace(); 
  }, [Object.values(arrBoard).length]);

  return (
    <div className="App">
      <div className="appHeading">
        <AppBar />
      </div>
      <div className="main">
        <LeftPanel/>
       <div className="imgDiv">
        <img className="homeImgDiv" src={HomeImg} alt="HomeImg" width="400px"/>
       </div>
        <RightPanel/>
      </div>
    </div>
  );
}

export default App;
