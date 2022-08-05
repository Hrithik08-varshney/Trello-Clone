import React, { useState } from "react";

export default function ListAddCard(props) {
  return (
    <form className="titleTodoDiv" onSubmit={props.handleTodoForm}>
      <input
        type="text"
        className="todoTitleInput"
        placeholder={props.placeholder}
        onChange={props.handleChange}
      />
      <div className="titleTodoDivBtns">
        <button className="AddList">{props.Add}</button>
        <button className="cross" onClick={props.handleTodoTitle}>
          X
        </button>
      </div>
    </form>
  );
}
