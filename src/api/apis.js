import  axios  from "axios";

export const getBoards = async () => {

const res = await axios.get("https://trello-9063b-default-rtdb.asia-southeast1.firebasedatabase.app/boardData.json")

  return res.data;
};

export const postStar = async (postStarred)=>{

  /*   fetch(
        `https://trello-9063b-default-rtdb.asia-southeast1.firebasedatabase.app/starred.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postStarred),
        }
      ); */

  await axios.post("https://trello-9063b-default-rtdb.asia-southeast1.firebasedatabase.app/starred.json",{postStarred});
}

export const putStar =async(newObj)=>{

  /*  fetch(
        `https://trello-9063b-default-rtdb.asia-southeast1.firebasedatabase.app/starred.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...newObj }),
        }
      ); */

  axios.put("https://trello-9063b-default-rtdb.asia-southeast1.firebasedatabase.app/starred.json",{ ...newObj })
}

export const putBoard = async(arr)=>{

  /* fetch(
      "https://trello-9063b-default-rtdb.asia-southeast1.firebasedatabase.app/boardData.json",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...props.arr }),
      }
    ); */

  axios.put("https://trello-9063b-default-rtdb.asia-southeast1.firebasedatabase.app/boardData.json",{...arr})
}

export const getStar=async()=>{

  const res = await axios.get("https://trello-9063b-default-rtdb.asia-southeast1.firebasedatabase.app/starred.json")
  return res.data;
}

export const getWorkspace=async()=>{

  const res=await axios.get("https://trello-9063b-default-rtdb.asia-southeast1.firebasedatabase.app/workspace.json")
  return (res.data);
}