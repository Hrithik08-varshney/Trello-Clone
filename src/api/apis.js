import  axios  from "axios";

export const getBoards = async () => {

const res = await axios.get("https://trello-9063b-default-rtdb.asia-southeast1.firebasedatabase.app/boardData.json")

  return res.data;
};

export const putBoard = async(arr)=>{



  axios.put("https://trello-9063b-default-rtdb.asia-southeast1.firebasedatabase.app/boardData.json",{...arr})
}

export const putBoardList = async (arr,input)=>{
  axios.put(`https://trello-9063b-default-rtdb.asia-southeast1.firebasedatabase.app/${input}.json`,{...arr})
}

export const getBoardList = async (input) => {

  const res = await axios.get(`https://trello-9063b-default-rtdb.asia-southeast1.firebasedatabase.app/${input}.json`)
  
    return res.data;
  };

export const putWorkspace = async(arrWork)=>{
  axios.put("https://trello-9063b-default-rtdb.asia-southeast1.firebasedatabase.app/workspace.json",{...arrWork})
}

export const getWorkspace=async()=>{

  const res=await axios.get("https://trello-9063b-default-rtdb.asia-southeast1.firebasedatabase.app/workspace.json")
  return (res.data);
}

export const getWorkspaceByName=async(workspace)=>{
const res=await axios.get( `https://trello-9063b-default-rtdb.asia-southeast1.firebasedatabase.app/boardData/${workspace}.json`);
return (res.data);
}