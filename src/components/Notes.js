import { useParams } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { getBoardList, getBoards, putBoard, putBoardList } from "../api/apis";
import { ArrBoard } from "../context/arrBoard";
import StarButton from "./StarButton";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useNavigate } from "react-router-dom";
import ListAddCard from "./ListAddCard";
import EditIcon from "@mui/icons-material/Edit";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
const Notes = () => {
  const { workspace, title } = useParams();
  const { arrBoard, setArrBoard } = useContext(ArrBoard); //arrBoard data
  const [obj, setObj] = useState({}); //filtered object according to workspace,title

  const [checkInput, setCheckInput] = useState(false); //board title name change pointer
  const [titleInput, setTitleInput] = useState(title); //board title name set after input

  const [checkTodoTitle, setTodoTitle] = useState(false); //todo title check pointer

  const [checkList, setCheckList] = useState(false); //check point for list addCard

  const [todoHead, setTodoHead] = useState(""); //todo list heading

  /* const [listArr, setListArr] = useState([]); //todo list arr */

  const [listVal, setListVal] = useState(""); //list value of arr

  const [todoObj, setTodoObj] = useState([]); //add heading and arrList in an Object

  const [checkEdit, setCheckEdit] = useState(false);  //checking edit list content toggle input

  /* const [draglist,setDragList] = useState(todoObj) */

  const postData=(newObj)=>{

    console.log(newObj);

    const {todoHead,listArr,checkList} = newObj; //object destructuring
      const res = fetch(
        `https://trello-9063b-default-rtdb.asia-southeast1.firebasedatabase.app/${titleInput}.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            todoHead,
            listArr,
            checkList
          }), 
        }
      );
}

  const handlecheckList = (index) => {
    //setting list check pointer
    if (todoObj[index]?.checkList === false) {
      setCheckList(true);
      todoObj[index].checkList = true;
    } else {
      setCheckList(false);
      todoObj[index].checkList = false;
    }
  };

  const handleTodoForm = (e) => {
    //todo function
    e.preventDefault();
    let newObj = {
      todoHead: todoHead,
      listArr: [],
      checkList: checkList,
    };
    setTodoObj([...todoObj, newObj]);
    postData(newObj);
    
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

  useEffect(()=>{
    const fetchList = async () =>{
      const result = await getBoardList(titleInput);
      if (result != null || undefined) {
       setTodoObj(result);
      }
    }
    fetchList();
  },[])

  const handleListForm = (e, index) => {
    e.preventDefault();
    todoObj[index]?.listArr.push(listVal);
    console.log(todoObj,"todoObj");
    putBoardList(todoObj,titleInput);
    handlecheckList(index);
  };

  const handleListChange = (e) => {
    setListVal(e.target.value);
  };

  const changeEdit = (e, valIndex, item) => {
    e.preventDefault();
    console.log(valIndex, item, "sdfghjkl");
    item.listArr[valIndex] = listVal;
    console.log(todoObj, "todoObj");
     putBoardList(todoObj,titleInput); 
       handleEdit();
  };
  const handleEdit = (valIndex) => {
    if (checkEdit === false) setCheckEdit(true);
    else setCheckEdit(false);
  };

  const handleOnDragEnd=(index,result)=>{
    console.log(result,index,"result");
     if (!result.destination) return; 

     if (result.destination.droppableId === result.source.droppableId && result.destination.index === result.source.index) {
      return;
    }
    const items = Array.from(todoObj[index].listArr);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    todoObj[index].listArr=items;
    console.log(todoObj,"todoObj");
    putBoardList(todoObj,titleInput);
  }
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
        {todoObj && todoObj.length
          ? todoObj.map((item, index) => {
              return (
                <DragDropContext key={index} onDragEnd={(result)=>{
                  handleOnDragEnd(index,result);
                }}>
                  <Droppable droppableId={`todoDiv${index}`}>
                    {(provided) => (
                      <div
                        key={index}
                        className="todoDiv"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        <div className="todoHeading">{item.todoHead}</div>
                        <div className="listCards">
                          {todoObj[index].listArr &&
                            todoObj[index].listArr.map((val, valIndex) => {
                              return (
                                <Draggable
                                  key={todoObj[index].listArr[valIndex]}
                                  draggableId={todoObj[index].listArr[valIndex]}
                                  index={valIndex}
                                >
                                  {(provided) => (
                                    <div
                                      className="listContent"
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      ref={provided.innerRef}
                                    >
                                      {checkEdit ? (
                                        <form
                                          onSubmit={(e) => {
                                            changeEdit(e, valIndex, item);
                                          }}
                                        >
                                          <input
                                            type="text"
                                            defaultValue={
                                              todoObj[index].listArr[valIndex]
                                            }
                                            className="todoTitleInput"
                                            onChange={handleListChange}
                                          />
                                        </form>
                                      ) : (
                                        <>
                                          <div>{val}</div>
                                          <div>
                                            <button
                                              className="editList"
                                              onClick={() => {
                                                handleEdit(valIndex);
                                              }}
                                            >
                                              <EditIcon />
                                            </button>
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  )}
                                </Draggable>
                              );
                            })}
                        </div>
                        <div className="todoObj">
                          {todoObj[index].checkList ? (
                            <ListAddCard
                              handleTodoForm={(e) => {
                                handleListForm(e, index);
                              }}
                              placeholder="Enter a Title For This Card..."
                              Add="Add Card"
                              handleTodoTitle={() => {
                                handlecheckList(index);
                              }}
                              handleChange={handleListChange}
                            />
                          ) : (
                            <button
                              className="buttonMenuBtn"
                              onClick={() => {
                                handlecheckList(index);
                              }}
                            >
                              + Add a Card
                            </button>
                          )}
                        </div>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              );
            })
          : null}
        <div className="todoInputBtn">
          {checkTodoTitle ? (
            <ListAddCard
              handleTodoForm={handleTodoForm}
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
