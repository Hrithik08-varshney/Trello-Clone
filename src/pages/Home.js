import "../App.css";
import AppBar from "../components/AppBar";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";
import { useContext, useEffect } from "react";
import { getWorkspace } from "../api/apis";
import { ArrWorkspace } from "../context/arr.context";
function App() {
  
  // const [arr, setArr] = useState([]);
  const { setArrWork} = useContext(ArrWorkspace);

  useEffect(() => {
    const fetchWorkSpace = async () => {
      const result = await getWorkspace();
      setArrWork(result);
    }
  
    fetchWorkSpace()
  }, []);

  return (
    <div className="App">
      <div className="appHeading">
        <AppBar />
      </div>
      <div className="main">
        <LeftPanel/>
        <RightPanel />
      </div>
    </div>
  );
}

export default App;
