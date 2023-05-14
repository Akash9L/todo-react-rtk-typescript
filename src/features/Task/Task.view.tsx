import React from "react";
import { Badge, Button } from "react-bootstrap";
import "./Task.scss";
import { useAppDispatch } from "app/hooks";
import { fetchTodoList } from "features/TodoList/TodoList.slice";
import { AiOutlineMinusCircle, AiOutlineEdit } from "react-icons/ai";
import { Task, TaskStatusEnum } from "type.dto";
import { deleteTodo, updateTodo } from "API";

type Props = {
  task: Task;
};

const TaskView: React.FC<Props> = ({ task }) => {
  const dispatch = useAppDispatch();

  const handleUpdateStatus = () => {
    updateTodo(task)
      .then((response) => {
        alert(`Congratulations for completing the task!`);
        dispatch(fetchTodoList());
      })
      .catch((error) => {
        alert(`${error.message}`);
      });
  };

  const handleDeleteTask = () => {
    if (window.confirm("Delete the item?")) {
      deleteTodo(task.id.toString())
        .then((response) => {
          alert(`Task Deleted Successfully`);
          dispatch(fetchTodoList());
        })
        .catch((error) => {
          alert(`${error.message}`);
        });
    }
  };

  return (
    <div
      key={task.id}
      className="d-flex flex-column task-container shadow-lg p-3 bg-body-tertiary rounded-4"
    >
      <div className="d-flex align-items-center justify-content-end">
        {task.status === TaskStatusEnum.COMPLETED ? (
          <h5 className="flex-fill d-flex justify-content-start">
            <Badge className="task-status-badge px-3" bg="success">
              Completed
            </Badge>
          </h5>
        ) : null}
        {/* <h4>
          <AiOutlineEdit></AiOutlineEdit>
        </h4> */}
        <h4 className="ms-2">
          <AiOutlineMinusCircle
            className="icon-button"
            color="maroon"
            onClick={handleDeleteTask}
          ></AiOutlineMinusCircle>
        </h4>
      </div>
      <div className="name text-uppercase py-3">
        <strong>{task.name}</strong>
      </div>
      <div className="description text-secondary flex-fill h6 pt-2 border-top">
        {task.description}
      </div>
      {task.status === TaskStatusEnum.TODO ? (
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
