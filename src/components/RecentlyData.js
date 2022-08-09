import React from "react";
import { getRecently } from "../api/apis";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RecentlyData() {
  const navigate = useNavigate();

  const [recentArr, setRecently] = useState([]);

  const handleRecentTab = (item) => {
    console.log(item);
    navigate(`/${item.workspaceName}/${item.title}`);
  };

  useEffect(() => {
    const fetchRecently = async () => {
      const result = await getRecently();
      if (result !== null || result !== undefined) {
        setRecently(result);
      }
    };

    fetchRecently();
  }, []);

  return (
    <>
      {recentArr &&
        recentArr?.length &&
        recentArr?.map((item, index) => {
          return (
            <div key={index}
            className="starButtonDiv">
              <div
                className="contentRowBtn"
                onClick={() => {
                  handleRecentTab(item);
                }}
              >
                <div key={index} className="contentRow">
                  <div className="contentRowImgDiv">
                    <img
                      src={item?.img}
                      alt={item?.img}
                      width="60px"
                      height="50px"
                    />
                  </div>
                  <div className="contentRowInfoDivParent">
                    <div className="contentRowInfoDiv">
                      <p className="contentRowInfoDivHead">{item?.title}</p>
                      <p className="contentRowInfoDivSpaceName">
                        {item?.workspaceName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}
