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
  }, [dispatch]);

  const todoSlice = useAppSelector((state) => state.todo);

  return (
    <div>
      <h1 className="mt-5">List of Tasks</h1>

      {/* Show Task */}
      {todoSlice.loading && <div>Loading...</div>}
      {!todoSlice.loading && todoSlice.error ? (
        <div>Error: {todoSlice.error}</div>
      ) : null}
      <div className="list-container">
        <div className="d-flex flex-column align-items-center justify-content-center shadow-lg p-3 bg-body-tertiary rounded-4">
          <h5>Add Task</h5>
          <div>
            <Button
              className="ms-2 mb-2 rounded-circle"
              variant="primary"
              onClick={handleOpen}
            >
              <AiOutlinePlus></AiOutlinePlus>
            </Button>
          </div>
        </div>
        {!todoSlice.loading && todoSlice.todoList.length
          ? todoSlice.todoList.map((task) =>
              TaskView({
                task,
              })
            )
          : null}
      </div>
      <AddTaskView show={show} handleClose={handleClose}></AddTaskView>
    </div>
  );
}
