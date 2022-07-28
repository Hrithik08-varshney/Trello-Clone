import React from "react";
import { Link } from "react-router-dom";
import StarButton from "../StarButton";

export default function Card(props) {
  const { path, title, img, arrStar, setArrStar, item } = props;
  return (
    <div className="linkDiv">
      <Link to={path} className="fetchedContent">
        <p>{title}</p>
        <img
          className="fetchedContentImg"
          src={img}
          alt={img}
          width="200px"
          height="100px"
        />
      </Link>
      <StarButton val={item} dataObj={arrStar} setDataObj={setArrStar} />
    </div>
  );
}
