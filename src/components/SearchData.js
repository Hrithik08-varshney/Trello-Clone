import React, { useEffect } from "react";
import { getBoards } from "../api/apis";
import { useState } from "react";
import notfound from "../assets/insertImages/notfound.jpeg";

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
    items.map((item) => {
      if (props.searchValue.toLowerCase() === item.title.toLowerCase() ) {
        console.log(props.searchValue);
        console.log(props.searchValue.toLowerCase() === item.title.toLowerCase(), item,"sjdshiushiuh");
        setFilteredArray([item]);
        setIsBoolean(false);
      }
    });
    if (isBoolean ===  false) {
      setIsBoolean(true);
    }

  };


  useEffect(() => {
    console.log(filteredArray, "FILTERED_ARRAY_IFFF");
  }, [filteredArray]);

  //   console.log(props.searchValue, filteredArray, "filteredArray");

  useEffect(() => {
    filterData(arrSearch);
    // setIsBoolean(true);
  }, [props.searchValue]);

  return (
    <div>
      {isBoolean ? (
        <ImageComponent />
      ) : (
        filteredArray &&
        filteredArray.length &&
        filteredArray?.map((val, index) => {
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
