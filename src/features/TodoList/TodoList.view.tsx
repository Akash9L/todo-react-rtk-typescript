import { useAppDispatch, useAppSelector } from "app/hooks";
import React, { useEffect, useState } from "react";
import { fetchTodoList } from "./TodoList.slice";
import { TaskView } from "features/Task/Task.view";
import { AddTaskView } from "features/AddTask/AddTask.view";
import "./Todo.scss";
import { Button, Form } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { updateFilters } from "./TodoList.slice";
import { TaskStatusEnum } from "type.dto";

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

  function handleSearchStringChange(event: React.ChangeEvent<any>): void {
    dispatch(
      updateFilters({
        searchString: event.target.value || "",
        status: todoSlice.filters.status,
      })
    );
  }

  function onStatusFilterChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    const status = event.target.value;
    const isChecked = event.target.checked;
    console.log(
      "onStatusFilterChange",
      isChecked,
      status,
      todoSlice.filters.status
    );
    if (isChecked) {
      //Add element to status filter
      dispatch(
        updateFilters({
          searchString: todoSlice.filters.searchString,
          status: todoSlice.filters.status
            .filter((item) => item !== status)
            .concat(status),
        })
      );
    } else {
      //Remove element from status filter
      dispatch(
        updateFilters({
          searchString: todoSlice.filters.searchString,
          status: todoSlice.filters.status.filter((item) => item !== status),
        })
      );
    }
  }

  return (
    // Adding opactiy as quick hack only for style preference. Wanted the colors to look more subtle
    <div style={{ opacity: "85%" }}>
      <header className="pt-5">
        <div className="d-flex flex-column flex-md-row px-5 justify-content-center">
          <h1>
            <strong>
              <span className="text-primary">TODO</span> LIST
            </strong>
          </h1>
          <div className="flex-fill mx-md-5 py-2">
            <Form.Control
              type="search"
              placeholder="SEARCH BY TASK NAME . . ."
              className="me-2"
              aria-label="Search"
              value={todoSlice.filters.searchString}
              onChange={handleSearchStringChange}
            />
          </div>
          <div className="py-2">
            <Form.Check
              inline
              type="switch"
              id="pending-switch"
              label="PENDING"
              value={TaskStatusEnum.TODO}
              onChange={onStatusFilterChange}
              checked={todoSlice.filters.status.some(
                (item) => item === TaskStatusEnum.TODO
              )}
            />
            <Form.Check
              inline
              type="switch"
              id="completed-switch"
              label="COMPLETED"
              value={TaskStatusEnum.COMPLETED}
              onChange={onStatusFilterChange}
              checked={todoSlice.filters.status.some(
                (item) => item === TaskStatusEnum.COMPLETED
              )}
            />
          </div>
        </div>
      </header>

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
        {!todoSlice.loading && todoSlice.filteredTodos.length
          ? todoSlice.filteredTodos.map((task) =>
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
