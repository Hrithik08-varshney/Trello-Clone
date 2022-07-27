import AppBar from "../components/AppBar";
import {useLocation} from "react-router-dom"
const Create=()=>{
    const state=useLocation();
    console.log(state.state);
    return (
    <>
     <AppBar/>
    </>
    )
}
export default Create;