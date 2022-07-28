import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Routers from "./components/Routers";
import StarContextProvider from "./context/start.context";
import  ArrWorkspace from "./context/arr.context";
import  ArrBoard  from "./context/arrBoard";
import ArrStar  from "./context/arrStar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
      <ArrStar>
  <ArrBoard>

    <ArrWorkspace>
    <StarContextProvider>
      <BrowserRouter>
        <Routers></Routers>
      </BrowserRouter>
      </StarContextProvider>
      </ArrWorkspace>
     
      </ArrBoard>
      </ArrStar>
  </>
);

reportWebVitals();