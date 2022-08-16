import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Pop from "./Pop.js";
import "../App.css";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CreateButtonData from "./CreateButtonData.js";
import { Link } from "react-router-dom";
import WorkPopData from "./WorkPopData.js";
import StarredData from "./StarredData.js";
import RecentlyData from "./RecentlyData.js";
import SearchData from "./SearchData";
import { useState } from "react";

const AppBarFunc = () => {

  const data = [
    {
      name: "Workspace",
      check: "true",
      popData:<WorkPopData
          setOpen="setOpen"
      />
    },
    { name: "Recent", check: "true",
    popData:<RecentlyData/>
   },
  
    { name: "Starred", check: "true",
    popData:<StarredData
    setOpen="setOpen"
    />
   },
    {
      name: "Templates",
      check: "true",
      popData:""
    },
  ];

  const styles = {
    width: 300,
    position: "absolute",
    color: "black",
    top: 28,
    right: 0,
    left: 0,
    zIndex: 1,
    border: "1px solid",
    p: 1,
    bgcolor: "background.paper",
    cursor: "pointer",
  };
  const searchStyle = {
    width: 300,
    position: "absolute",
    color: "black",
    top: 40,
    left: -55,
    zIndex: 1,
    border: "1px solid",
    p: 1,
    bgcolor: "background.paper",
    cursor: "pointer",
  };
  const infoStyle = {
    width: 300,
    position: "fixed",
    color: "black",
    top: 60,
    right: 0,
    left: 1100,
    zIndex: 1,
    border: "1px solid",
    p: 1,
    bgcolor: "background.paper",
    cursor: "pointer",
  };
  const notificationStyle = {
    width: 300,
    position: "fixed",
    color: "black",
    top: 60,
    right: 0,
    left: 1150,
    zIndex: 1,
    border: "1px solid",
    p: 1,
    bgcolor: "background.paper",
    cursor: "pointer",
  };
  const accountStyle = {
    width: 300,
    position: "fixed",
    color: "black",
    top: 60,
    right: 0,
    left: 1200,
    zIndex: 1,
    border: "1px solid",
    p: 1,
    bgcolor: "background.paper",
    cursor: "pointer",
  };

  const [searchValue,setSearchValue]=useState("");

  const handleSearchValue=(e)=>setSearchValue(e.target.value);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <div className="header">
              <div className="left-side">
                <div className="logo-btn">
                  <Button variant="text">
                    <Link
                      exact="true"
                      style={{
                        color: "white",
                        fontSize: "20px",
                        fontFamily: "cursive",
                      }}
                      to="/"
                    >
                      Trello
                    </Link>
                  </Button>
                </div>

                <div className="menu-list">
                  {data.map((item) => (
                   <Pop
                      key={item.name}
                      name={item.name}
                      check={item.check}
                      styling={styles}
                      headingName={item.name}
                    >{item.popData}</Pop>
                  ))}

                  <div className="button">
                    <Pop
                      name="Create"
                      check="false"
                      headingName="Create"
                      styling={styles}
                    >
                      <CreateButtonData />
                    </Pop>
                  </div>
                </div>
              </div>
              <div className="right-side">
                <div className="search-div">
                  <div className="searchIcon">
                    <SearchSharpIcon
                      sx={{
                        mt: 2,
                      }}
                    />
                  </div>
                    <Pop
                      name={
                        <input className="searchInput" placeholder="Search" onChange={handleSearchValue}/>
                      }
                      check="false"
                      styling={searchStyle}
                      headingName="Search"
                    ><SearchData
                    searchValue={searchValue}
                    /></Pop>
                </div>
                <div className="info">
                  <Pop
                    name={<InfoOutlinedIcon />}
                    styling={infoStyle}
                    check="false"
                    headingName="Information"
                  ></Pop>
                </div>
                <div className="notification">
                  <Pop
                    name={<NotificationsNoneIcon/>}
                    styling={notificationStyle}
                    check="false"
                    headingName="Notification"
                  ></Pop>
                </div>
                <div className="account">
                  <Pop
                    name="A"
                    check="false"
                    styling={accountStyle}
                    headingName="Account"
                  />
                </div>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
export default AppBarFunc;
