import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Routers from "./components/Routers";
import StarContextProvider from "./context/start.context";
import  ArrWorkspace from "./context/arr.context";
import  ArrBoard  from "./context/arrBoard";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
  <ArrBoard>
    <ArrWorkspace>
    <StarContextProvider>
      <BrowserRouter>
        <Routers></Routers>
      </BrowserRouter>
      </StarContextProvider>
      </ArrWorkspace>
      </ArrBoard>
  </>
);

reportWebVitals();