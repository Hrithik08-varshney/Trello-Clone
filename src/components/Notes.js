import { useParams } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { getBoards, putBoard } from "../api/apis";
import { ArrBoard } from "../context/arrBoard";
import StarButton from "./StarButton";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useNavigate } from "react-router-dom";
import TodoList from "./TodoList";
import ListAddCard from "./ListAddCard";
const Notes = () => {
  const { workspace, title } = useParams();
  const { arrBoard, setArrBoard } = useContext(ArrBoard); //arrBoard data
  const [obj, setObj] = useState({}); //filtered object according to workspace,title

  const [checkInput, setCheckInput] = useState(false); //board title name change pointer
  const [titleInput, setTitleInput] = useState(title); //board title name set after input

  const [checkTodoTitle, setTodoTitle] = useState(false); //todo title check pointer

  const [todoHead, setTodoHead] = useState(""); //todo list heading

  const [listArr, setListArr] = useState([]); //todo list arr

  const [listVal,setListVal]=useState("");  //list value of arr

  const [todoObj, setTodoObj] = useState([]); //add heading and arrList in an Object

  const [checkList, setCheckList] = useState(false); //check point for list addCard

  const handlecheckList = () => {
    //setting list check pointer
    if (checkList === false) setCheckList(true);
    else setCheckList(false);
    
  };

  const handleAdd = () => {
    
    let newObj={
      todoHead: todoHead, listArr: listArr
    }
    setTodoObj([...todoObj,newObj]);
    setTodoTitle(false);
  };

  const handleChange = (e) => {
    //seting todo title in  todoHead
    setTodoHead(e.target.value);
  };

  const handleTodoTitle = () => {
    //todo title div and button toggle
    if (!checkTodoTitle) setTodoTitle(true);
    else setTodoTitle(false);
  };

  const handleTodoForm = (e) => {
    //todo function
    e.preventDefault();
    let newObj={
      todoHead: todoHead, listArr: listArr
    }
    setTodoObj([...todoObj,newObj]);
    setTodoTitle(false);
  };


  const navigate = useNavigate();

  const handleTitleInput = () => {
    //input check pointer update function
    setCheckInput(true);
  };

  const handleForm = (e) => {
    //changing title name of board in database
    e.preventDefault();
    for (const key in arrBoard) {
      if (key === workspace) {
        Object.values(arrBoard[key]).map((item, index) => {
          if (item.title === title) {
            item.title = titleInput;
          }
        });
      }
    }
    console.log(arrBoard);
    putBoard(arrBoard);
    setCheckInput(false);
    navigate(`/${workspace}/${titleInput}`);
  };

  const handleInputValue = (e) => {
    //seting input value
    setTitleInput(e.target.value);
  };

  useEffect(() => {
    //  setting boards data
    const fetchWorkSpace = async () => {
      const result = await getBoards();
      if (result != null || undefined) {
        setArrBoard(result);
      }
    };
    fetchWorkSpace();
  }, []);

  useEffect(() => {
    ///filtering arrBoard data according to needed obj
    Object.values(arrBoard).map((item, index) => {
      return Object.values(item).map((val, valIndex) => {
        if (val.title === title) {
          setObj({ ...val });
        }
      });
    });
  }, [Object.values(arrBoard).length]);

  const handleListForm = (e) => 
  {
    e.preventDefault();
    setListArr([...listArr,listVal]);
  };

  const handleListChange = (e) => {
    console.log(e.target.value,"eeeeeeeeeeeee");
    setListVal(e.target.value);
  };
  const handleListAdd = () => {};
  return (
    <>
      <div className="notesDiv">
        <img className="createImage" src={obj?.img} alt={obj?.img} />
        <form className="buttonMenu" onSubmit={handleForm}>
          {checkInput ? (
            <input
              type="text"
              className="checkInput"
              onChange={handleInputValue}
            />
          ) : (
            <button className="buttonMenuBtn" onClick={handleTitleInput}>
              {titleInput}
            </button>
          )}

          <button className="buttonMenuBtn">
            <StarButton val={obj} />
          </button>
          <button className="buttonMenuBtn">{workspace}</button>
          <button className="buttonMenuBtn">
            {" "}
            <PersonAddAltIcon /> Share
          </button>
        </form>
      </div>

      <div className="todoMain">
        {todoObj && todoObj.length ? (

          todoObj.map((item,index)=>{
              return(
                <div 
                key={index}
                className="todoDiv">
            <div className="todoHeading">{item.todoHead}</div>
            <div className="todoObj">
              {checkList ? (
                <ListAddCard
                key={index}
                  handleTodoForm={handleListForm}
                  handleAdd={handleListAdd}
                  placeholder="Enter a Title For This Card..."
                  Add="Add Card"
                  handleTodoTitle={handlecheckList}
                  handleChange={handleListChange}
                />
              ) : (
                <button className="buttonMenuBtn" onClick={handlecheckList}>
                  + Add a Card
                </button>
              )}
            </div>
          </div>
              )
          })
          
         
        ) : null}
        <div className="todoInputBtn">
          {checkTodoTitle ? (
            <ListAddCard
              handleTodoForm={handleTodoForm}
              handleAdd={handleAdd}
              placeholder="Enter List title..."
              Add="Add List"
              handleTodoTitle={handleTodoTitle}
              handleChange={handleChange}
            />
          ) : (
            <button className="buttonMenuBtn" onClick={handleTodoTitle}>
              + Add Another List
            </button>
          )}
        </div>
      </div>
    </>
  );
};
export default Notes;


