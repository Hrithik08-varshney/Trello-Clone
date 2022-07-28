import App from "../pages/Home";
import Error from "../pages/Error";
import Boards from "../pages/Boards";
import { Routes, Route } from "react-router-dom";
import Create from "../pages/Create";
import Workspace from "../pages/Workspace";
const Routers = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="*" element={<Error />} />
        <Route path="/:workspace/:title" element={<Create />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/:workspace" element={<Workspace />} />
      </Routes>
    </>
  );
};
export default Routers;
