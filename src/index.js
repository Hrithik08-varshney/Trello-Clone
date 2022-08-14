import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Routers from "./components/Routers";
import ArrWorkspace from "./context/arr.context";
import ArrBoard from "./context/arrBoard";
import ListName from "./context/listName";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ArrBoard>
      <ArrWorkspace>
        <ListName>
          <BrowserRouter>
            <Routers></Routers>
          </BrowserRouter>
        </ListName>
      </ArrWorkspace>
    </ArrBoard>
  </>
);

reportWebVitals();
