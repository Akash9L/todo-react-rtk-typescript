import React from "react";
import { Badge, Button } from "react-bootstrap";
import "./Task.scss";
import axios from "axios";
import { useAppDispatch } from "app/hooks";
import { fetchTodoList } from "features/TodoList/TodoList.slice";
import { TodoListStatusEnum, TodoTask } from "./Task.dto";

const TaskView: React.FC<TodoTask> = (task) => {
  const dispatch = useAppDispatch();
  const handleUpdateStatus = () => {
    axios.defaults.baseURL = "http://localhost:3001";
    axios
      .patch(`/api/${task.id}`, {
        status: "COMPLETED",
      })
      .then((response) => {
        console.log(
          `[UpdateTaskStatus] Updated Status for task Id = ${task.id} to COMPLETED:`,
          response
        );
        alert(`Updated Status for task Id = ${task.id} to COMPLETED`);
        dispatch(fetchTodoList());
      })
      .catch((error) => {
        console.error(`[UpdateTaskStatus] Error:`, error);
      });
  };
  return (
    <div
      key={task.id}
      className="d-flex flex-column task-container shadow-lg p-3 bg-body-tertiary rounded-4"
    >
      {task.status === TodoListStatusEnum.COMPLETED ? (
        <h5>
          <Badge className="task-status-badge" bg="success">
            Completed
          </Badge>
        </h5>
      ) : null}
      <div className="name text-uppercase py-3">
        <strong>{task.name}</strong>
      </div>
      <div className="description flex-fill h6 pt-2 border-top">
        {task.description}
      </div>
      {task.status === TodoListStatusEnum.INCOMPLETE ? (
        <Button
          className="mb-2"
          onClick={handleUpdateStatus}
          variant="outline-primary"
        >
          Mark as complete
        </Button>
      ) : null}
    </div>
  );
};

export { TaskView };
