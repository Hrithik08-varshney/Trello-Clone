import { useParams } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import {
  getBoardList,
  getBoards,
  putBoard,
  putBoardList,
  getRecently,
  postRecently,
  putRecently,
} from "../api/apis";
import { ArrBoard } from "../context/arrBoard";
import StarButton from "./StarButton";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useNavigate } from "react-router-dom";
import ListAddCard from "./ListAddCard";
import EditIcon from "@mui/icons-material/Edit";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { deleteWorkspace } from "../api/apis";
import { TaskModal } from "./TaskModal";

const Notes = () => {
  const { workspace, title } = useParams();
  const { arrBoard, setArrBoard } = useContext(ArrBoard); //arrBoard data
  // const {depArr,setDepArr}=useState();
  const [obj, setObj] = useState({}); //filtered object according to workspace,title

  const [checkInput, setCheckInput] = useState(false); //board title name change pointer
  const [titleInput, setTitleInput] = useState(title); //board title name set after input

  const [checkTodoTitle, setTodoTitle] = useState(false); //todo title check pointer

  const [checkList, setCheckList] = useState(false); //check point for list addCard

  const [todoHead, setTodoHead] = useState(""); //todo list heading

  const [listVal, setListVal] = useState(""); //list value of arr

  const [todoObj, setTodoObj] = useState([]); //add heading and arrList in an Object

  const [checkEdit, setCheckEdit] = useState(false); //checking edit list content toggle input

  const [taskModalOpen, setTaskModalOpen] = useState(false);

  const handleTaskOpen = () => setTaskModalOpen(true);
  const handleTaskClose = () => setTaskModalOpen(false);

  const postData = (newObj) => {
    console.log(newObj);

    const { todoHead, listArr, checkList, work } = newObj; //object destructuring
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
          checkList,
          work,
        }),
      }
    );
  };

  const handlecheckList = (index) => {
    //setting list check pointer
    if (todoObj[index]?.checkList === false) {
      setCheckList(!checkList);
      todoObj[index].checkList = true;
    } else {
      setCheckList(!checkList);
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
      work: workspace,
    };
    setTodoObj([...todoObj, newObj]);
    console.log(newObj, "asdfghjkl;");
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
    console.log(getList);
    for (const key in arrBoard) {
      if (key === workspace) {
        Object.values(arrBoard[key]).map((item, index) => {
          if (item.title === title) {
            item.title = titleInput;
          }
        });
      }
    }

    var getList;
    putBoard(arrBoard)
      .then(async () => {
        getList = await getBoardList(title);
      })
      .then(async () => {
        putBoardList(getList, titleInput);
      });
    deleteWorkspace(title);
    setCheckInput(false);
    navigate(`/${workspace}/${titleInput}`);
  };

  const handleInputValue = (e) => {
    //seting input value
    setTitleInput(e.target.value);
  };

  // const [flag,setFlag]=useState(false);
  
  const recently = (result,val) => {
    var flag=false;
    result.map((item,index)=>{
      if(item?.img===val?.img && item?.starred===val?.starred && item?.title===val?.title && item?.workspaceName===val?.workspaceName){
        flag=true;
      }
    })
        if(flag===false){
      if ( result===undefined || result?.length <= 3) {
        postRecently({ ...val });
      } else {
        result?.shift();
        result?.push({ ...val });
        putRecently(result);
      }
    } 
  };

  useEffect(() => {
    const fetchRecently = async () => {
      const result = await getRecently(); 
        recently(result,obj);
    };

    fetchRecently();
  }, [obj]); 

  useEffect(() => {
    //  setting boards data
    const fetchBoards = async () => {
      const result = await getBoards();
      if (result !== null || result !== undefined) {
        setArrBoard(result);
      }
    };
    fetchBoards();
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

  useEffect(() => {
    const fetchList = async () => {
      const result = await getBoardList(titleInput);
      // console.log(result,"result");
      if (result && result.length && result[0].work === workspace)
        if (result != null || undefined) {
          result.forEach((item, index) => {
            if (!Object.keys(item).includes("listArr")) item.listArr = [];
          });
          setTodoObj(result);
        }
    };
    fetchList();
  }, []);

  const handleListForm = (e, index) => {
    e.preventDefault();
    let id = `${listVal}${index}`;
    let listObj = {
      id,
      listEdit: checkEdit,
      list: listVal,
    };
    todoObj[index].listArr.push(listObj);
    console.log(todoObj, "todoObj");
    setCheckList(!checkList);
    todoObj[index].checkList = false;
    putBoardList(todoObj, titleInput);
  };

  const handleListChange = (e) => {
    setListVal(e.target.value);
  };

  const changeEdit = (e, valIndex, item) => {
    e.preventDefault();
    console.log(valIndex, item, "sdfghjkl");
    item.listArr[valIndex].list = listVal;
    setCheckEdit(false);
    item.listArr[valIndex].listEdit = false;
    item.listArr[valIndex].id = `${listVal}${valIndex}`;
    console.log(item, "todoObj");
    putBoardList(todoObj, titleInput);
  };
  const handleEdit = (item, valIndex) => {
    if (item.listEdit === false) {
      setCheckEdit(true);
      item.listEdit = true;
    } else {
      setCheckEdit(false);
      item.listEdit = false;
    }

    console.log(item.listEdit, "item.listEdit");
  };

  const handleOnDragEnd = (index, result) => {
    console.log(result, index, "result");
    if (!result.destination) return;

    if (
      result.destination.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index
    ) {
      return;
    }
    const items = Array.from(todoObj[index].listArr);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    todoObj[index].listArr = items;
    console.log(todoObj, "todoObj");
    putBoardList(todoObj, titleInput);
  };

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
          ? todoObj?.map((item, index) => {
              return (
                <DragDropContext
                  key={index}
                  onDragEnd={(result) => {
                    handleOnDragEnd(index, result);
                  }}
                >
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
                          {todoObj &&
                            todoObj?.length &&
                            todoObj[index]?.listArr.map((val, valIndex) => {
                              return (
                                <Draggable
                                  key={val.id}
                                  draggableId={val.id}
                                  index={valIndex}
                                >
                                  {(provided) => (
                                    <div
                                      className="listContent"
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      ref={provided.innerRef}
                                    >
                                      {val.listEdit ? (
                                        <form
                                          onSubmit={(e) => {
                                            changeEdit(e, valIndex, item);
                                          }}
                                        >
                                          <input
                                            type="text"
                                            defaultValue={
                                              todoObj[index].listArr[valIndex]
                                                .list
                                            }
                                            className="todoTitleInput"
                                            onChange={handleListChange}
                                          />
                                        </form>
                                      ) : (
                                        <>
                                          <div className="taskValueDiv" onDoubleClick={()=>handleTaskOpen()}>{val.list}</div>
                                          <TaskModal 
                                          val={val}
                                          item={item}
                                          valIndex={valIndex}
                                          taskModalOpen={taskModalOpen} handleTaskClose={handleTaskClose}/>
                                          <div>
                                            <button
                                              className="editList"
                                              onClick={() => {
                                                handleEdit(val, valIndex);
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
