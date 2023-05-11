import { useAppDispatch, useAppSelector } from "app/hooks";
import React, { useEffect, useState } from "react";
import { fetchTodoList } from "./TodoList.slice";
import { TaskView } from "features/Task/Task.view";
import { AddTaskView } from "features/AddTask/AddTask.view";
import "./Todo.scss";
import { Button } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";

export function TodoList() {
  //Open show Add Task Modal
  const [show, setShow] = useState(false);
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTodoList());
  }, []);

  const todoSlice = useAppSelector((state) => state.todo);
  return (
    <div>
      <div className="d-flex px-5 py-3 justify-content-center align-items-cente">
        <h2 className="flex-fill">List of Tasks</h2>
        <div className="d-flex align-items-center">
          <h5>Add Task</h5>
          <Button
            className="ms-2 mb-2 rounded-circle"
            variant="primary"
            onClick={handleOpen}
          >
            <AiOutlinePlus></AiOutlinePlus>
          </Button>
        </div>
      </div>
      {/* Show Task */}
      {todoSlice.loading && <div>Loading...</div>}
      {!todoSlice.loading && todoSlice.error ? (
        <div>Error: {todoSlice.error}</div>
      ) : null}
      <div className="list-container">
        {!todoSlice.loading && todoSlice.todoList.length ? (
          <div>{todoSlice.todoList.map((todo) => TaskView(todo))}</div>
        ) : null}
      </div>
      <AddTaskView show={show} handleClose={handleClose}></AddTaskView>
    </div>
  );
}
