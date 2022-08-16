import React from "react";
import { useState } from "react";

export default function LabelsData() {
  let styles = [
    {
      backgroundColor: "Tomato",
      width: "80px",
      height: "50px",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      color:"black"
    },
    {
      backgroundColor: "Orange",
      width: "80px",
      height: "50px",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    },
    {
      backgroundColor: "DodgerBlue",
      width: "80px",
      height: "50px",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    },
    {
      backgroundColor: "MediumSeaGreen",
      width: "80px",
      height: "50px",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    },
    {
      backgroundColor: "Gray",
      width: "80px",
      height: "50px",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    },
    {
      backgroundColor: "SlateBlue",
      width: "80px",
      height: "50px",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    },
    {
      backgroundColor: "Violet",
      width: "80px",
      height: "50px",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    },
    {
      backgroundColor: "LightGray",
      width: "80px",
      height: "50px",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    },
    {
      backgroundColor: "Pink",
      width: "80px",
      height: "50px",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    },
  ];

  const [labelArr,setLabelArr]=useState([]);
  const [checkLabel, setCheckLabel] = useState(true);

const [prevItem,setPrevItem]=useState({});

const [labelInput,setLabelInput]=useState("");

const handleLabelInput=(e)=>{
    setLabelInput(e.target.value);
}
const handleEdit=(item,index)=>{
    console.log(item);
}
const handleDelete=(index)=>{
    const newArr = labelArr.filter((arrElem, e) => e !== index);
    setLabelArr(newArr);
}
const handleCreate=()=>{
    let pushObj={
        color:prevItem?.item?.backgroundColor,
        name:labelInput,
        id:labelInput+prevItem?.index,
        tick:true,
        show:false
    }
    setLabelArr([...labelArr,pushObj]);
    handleCheck();
}

console.log(labelArr,"labelArr");

  const handleCheck = () => {
    setCheckLabel(!checkLabel);
  };
  const handleTick = (item,index) => {
    item={...item,tick:true}
    styles[index]={
        ...item
    }
    setPrevItem({
       index,item
    });
  };
  return (
    <div className="labelInnerDiv">
      {checkLabel ? (
        <>
        {
        labelArr && labelArr.length ?
          <div className="labelsData">
          {
             labelArr.map((item,index)=>{
               return (<div key={index} className="labelRow">
                 <div style={{
                    backgroundColor:item.color,
                    width:"220px",
                    borderRadius:"5px",
                    fontWeight:"bold",
                    padding:"5px"
                 }}>
                   {item.name}
                 </div>
                 <div className="labelBtn">
                 <div className="labelEdit" onClick={()=>{
                    handleEdit(item,index);
                 }}>
                 ✏️
                 </div>
                 <div className="labelDelete" onClick={()=>{
                    return handleDelete(index);
                 }}>
                 🗑️
                 </div>   
                 </div>
               </div>)
            })
          }
          </div> : null
        }
          <button className="buttonMenuBtn" onClick={handleCheck}>
            Create a new label
          </button>
        </>
      ) : (
        <div className="createLabelData">
          <div className="createInput">
            <h4>Name</h4>
            <input type="text" onChange={handleLabelInput}/>
          </div>
          <div className="selectColor">
            <h4>Select a Color</h4>
            <div className="colors">
              {styles.map((item, index) => {
                return (
                  <div
                    key={index}
                    style={item}
                    onClick={() => {
                      handleTick(item,index);
                    }}
                  >
                    {
                        item.tick ? <h1>✔</h1> :<h1></h1>
                    }
                  </div>
                );
              })}
            </div>
          </div>
          <div className="createCancel">
            <button className="buttonMenuBtn" onClick={handleCreate}>Create</button>
            <button className="buttonMenuBtn">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
