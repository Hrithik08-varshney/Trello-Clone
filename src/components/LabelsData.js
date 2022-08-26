import React from "react";
import { useState,useEffect,useContext } from "react";
import { postListModalData } from "../api/apis";
import { ListName } from "../context/listName";


export default function LabelsData() {

  let styles = [
    {
      backgroundColor: "Tomato",
      width: "80px",
      height: "50px",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      tick:false,
      color:"black"
    },  
    {
      backgroundColor: "Orange",
      width: "80px",
      height: "50px",
      display: "flex",
      justifyContent: "space-around",
      tick:false,
      alignItems: "center",
    },
    {
      backgroundColor: "DodgerBlue",
      width: "80px",
      height: "50px",
      display: "flex",
      justifyContent: "space-around",
      tick:false,
      alignItems: "center",
    },
    {
      backgroundColor: "MediumSeaGreen",
      width: "80px",
      height: "50px",
      display: "flex",
      justifyContent: "space-around",
      tick:false,
      alignItems: "center",
    },
    {
      backgroundColor: "Gray",
      width: "80px",
      height: "50px",
      display: "flex",
      justifyContent: "space-around",
      tick:false,
      alignItems: "center",
    },
    {
      backgroundColor: "SlateBlue",
      width: "80px",
      height: "50px",
      display: "flex",
      justifyContent: "space-around",
      tick:false,
      alignItems: "center",
    },
    {
      backgroundColor: "Violet",
      width: "80px",
      height: "50px",
      display: "flex",
      justifyContent: "space-around",
      tick:false,
      alignItems: "center",
    },
    {
      backgroundColor: "LightGray",
      width: "80px",
      height: "50px",
      display: "flex",
      justifyContent: "space-around",
      tick:false,
      alignItems: "center",
    },
    {
      backgroundColor: "Pink",
      width: "80px",
      height: "50px",
      display: "flex",
      justifyContent: "space-around",
      tick:false,
      alignItems: "center",
    },
  ];

  const { listName } = useContext(ListName); //listName for modal

  const [obj,setObj]=useState({
    labelArrObj:[],
    dueDate:"",
    description:"",
    checkList:[]
  })
  const [labelArr,setLabelArr]=useState([]);
  const [checkLabel, setCheckLabel] = useState(true);

  const [labelArrIndx,setLabelArrIndx]=useState();
  const [styleIndx,setStyleIndx]=useState();

const [prevItem,setPrevItem]=useState({});

const [labelInput,setLabelInput]=useState("");

const handleLabelInput=(e)=>{
    setLabelInput(e.target.value);
}
const handleEdit=(item,index)=>{
  handleCheck();
  setLabelInput(item.name);
  labelArr.splice(index,1);
}
const handleDelete=(index)=>{
    const newArr = labelArr.filter((arrElem, e) => e !== index);
    setLabelArr(newArr);
}

const handleCancel=()=>{
  handleCheck();
  setLabelInput("");
}

const handleAddTick=(item,index)=>{
  if(item.tick===true)
  item.tick=false;
  else
  item.tick=true;
  setLabelArrIndx(index);
  setObj({...obj,labelArrObj:labelArr});
}

useEffect(() => {
  console.log(labelArr,"here is my label array");
  setObj({...obj,labelArrObj:labelArr});
  postListModalData(listName.list,obj);
}, [labelArr,labelArr[labelArrIndx]])

const handleCreate=()=>{
    let pushObj={
        color:prevItem?.item?.backgroundColor,
        name:labelInput,
        id:labelInput+prevItem?.index,
        tick:false
    }
    setLabelArr([...labelArr,pushObj]);
    setLabelInput("");
    handleCheck();
}

useEffect(()=>{
  postListModalData(listName.list,obj);
  console.log(obj,"objectsssss");

},[obj.labelArrObj])

  const handleCheck = () => {
    setCheckLabel(!checkLabel);
  };
  const handleTick = (item,index) => {
    item={...item,tick:true}
    styles[index]={
        ...item
    }
    setStyleIndx(index);
    setPrevItem({
       index,item
    });
  };
  useEffect(() => {
  }, [styles[styleIndx]])
  
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
                    padding:"5px",
                    display:"flex",
                    justifyContent:"space-between"
                 }}>
                 <div style={{
                    cursor:"pointer"
                   }}onClick={()=>{
                     return handleAddTick(item,index);
                   }}>
                   {item.name}
                   </div>
                   {console.log(item.tick,"tickkkkkkkkkk")}
                   <div >
                   {
                    item.tick ? <p>✔</p> : null
                   }
                   </div>
                   
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
            <input type="text" onChange={handleLabelInput} value={labelInput}/>
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
                        item.tick ? <h4>✔</h4> :<h4> </h4>
                    }
                  </div>
                );
              })}
            </div>
          </div>
          <div className="createCancel">
            <button className="buttonMenuBtn" onClick={handleCreate}>Create</button>
            <button className="buttonMenuBtn" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
