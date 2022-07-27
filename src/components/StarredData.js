 import WorkContent from "./WorkContent";
 import { useContext } from "react";
 import  {ArrStar}  from "../context/arrStar.js";


const StarredData = () => {
  const {arrStar} = useContext(ArrStar);


  return arrStar ? (
    <div className="workPopDataContent">
      {Object.values(arrStar)
        .map((item, index) => {
          return (
            <>
              <WorkContent key={index} item={item} index={index} />
            </>
          );
        })}
    </div>
  ) : null;
};
export default StarredData;
