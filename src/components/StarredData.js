 import WorkContent from "./WorkContent";
 import { useContext } from "react";
 import  {ArrStar}  from "../context/arrStar.js";
 import { getStar } from "../api/apis";
 import { useEffect } from "react";


const StarredData = () => {
  const {arrStar,setArrStar} = useContext(ArrStar);

  useEffect(() => {
    const fetchWorkSpace = async () => {
      const result = await getStar();
      setArrStar(result);
      console.log(result);
    }
  
    fetchWorkSpace()
  }, []);

  return arrStar ? (
    <div className="workPopDataContent">
      {Object.values(arrStar)
        .map((item, index) => {
           return (
            <>
              <WorkContent 
               item={item} index={index} />
            </>
          ); 
        })}
    </div>
  ) : null;
};
export default StarredData;
