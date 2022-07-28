import StarButton from "./StarButton";
import {Link} from "react-router-dom";  
import {useState,useEffect} from "react";
import { getStar } from "../api/apis";


const BoardContent=(props)=>{

  const [dataObj, setDataObj] = useState(null);

  useEffect(() => {
    const fetchWorkSpace = async () => {
      const result = await getStar();
      setDataObj(result);
    }
  
    fetchWorkSpace()
  }, []);

    return(
        <div className="yourWorkspaceContent">
        {Object.values(props.item)?.map((val, valIndex) => {
          return (
            <div key={valIndex} className="linkDiv">
              <Link
                to={`/${props.objKeys[props.index]}/${val?.title}`}
                className="fetchedContent"
              >
                <p>{val?.title}</p>
                <img
                  className="fetchedContentImg"
                  src={val?.img}
                  alt={val?.img}
                  width="200px"
                  height="100px"
                />
              </Link>
              <StarButton
                val={val}
                dataObj={dataObj}
                setDataObj={setDataObj}
              />

            </div>
          );
        })}
      </div>
    )
}
export default BoardContent;