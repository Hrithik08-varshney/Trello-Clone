import React, { useEffect } from "react";
import { getBoards } from "../api/apis";
import { useState } from "react";
import notfound from "../assets/insertImages/notfound.jpeg";
import { faCommentsDollar } from "@fortawesome/free-solid-svg-icons";

const ImageComponent = () => {
  return <img src={notfound} alt="Not found" width="280px" height="200px" />;
};

export default function SearchData(props) {
  const [arrSearch, setArrSeach] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);
  const [isBoolean, setIsBoolean] = useState(true);

  useEffect(() => {
    //  setting boards data
    const fetchBoards = async () => {
      const result = await getBoards();
      if (result !== null || result !== undefined) {
        Object.values(result)?.map((item, index) => {
          return Object.values(item)?.map((val, valIndex) => {
            setArrSeach((prev) => {
              return [...prev, val];
            });
          });
        });
      }
    };
    fetchBoards();
  }, []);

  //   console.log(arrSearch, "ARRAY");

  const filterData = (items) => {
    // console.log(items, "itemsss");
    if (props.searchValue === "") {
      setIsBoolean(true);
      return;
    }

    items.filter((item) => {
      console.log(item?.title, "TITLE");
      if (props.searchValue === item.title) {
          setIsBoolean(false);
        setFilteredArray([...filteredArray, item]);
      }

      if (props.searchValue !== item.title) {
        setIsBoolean(true);
      }
    });
  };

  useEffect(() => {
    console.log(filteredArray, "FILTERED_ARRAY_IFFF");
  }, [filteredArray]);

  //   console.log(props.searchValue, filteredArray, "filteredArray");

  useEffect(() => {
    filterData(arrSearch);
  }, [props.searchValue, arrSearch]);

  return (
    <div>
      {isBoolean ? (
        <ImageComponent />
      ) : (
        filteredArray &&
        filteredArray.length &&
        filteredArray?.map((val, index) => {
          {
            /* console.log(val, "vaaaallllll"); */
          }
          return (
            <div key={index} className="starButtonDiv">
              <div className="contentRowBtn">
                <div key={index} className="contentRow">
                  <div className="contentRowImgDiv">
                    <img
                      src={val?.img}
                      alt={val?.img}
                      width="60px"
                      height="50px"
                    />
                  </div>
                  <div className="contentRowInfoDivParent">
                    <div className="contentRowInfoDiv">
                      <p className="contentRowInfoDivHead">{val?.title}</p>
                      <p className="contentRowInfoDivSpaceName">
                        {val?.workspaceName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

/* check ? (
    <div className="notFoundDiv">
      <img src={notfound} alt="Not found" width="280px" height="200px" />
    </div>
  ) :  */
