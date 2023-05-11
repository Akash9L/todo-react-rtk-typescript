import { useAppDispatch } from "app/hooks";
import axios from "axios";
import { TodoListStatusEnum, TodoTask } from "features/Task/Task.dto";
import { fetchTodoList } from "features/TodoList/TodoList.slice";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "./AddTask.scss";

export type IAddTaskViewProps = {
  handleClose: () => void;
  show: boolean;
};

const AddTaskView: React.FC<IAddTaskViewProps> = (addTaskViewProp) => {
  const defaultTodoTask: TodoTask = {
    name: "",
    description: "",
    status: "COMPLETED" as TodoListStatusEnum,
  };
  const [todoTask, setTodoTask] = useState(defaultTodoTask);

  const dispatch = useAppDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // 👇️ prevent page refresh
    console.log(`Current Form Data:`, todoTask);
    event.preventDefault();
    axios
      .post("http://localhost:3001/api", todoTask)
      .then((response) => {
        const responseTodoTask = response.data as TodoTask;
        console.log(`[AddNewTask] Added new Task:`, responseTodoTask);
        alert(`New Task Added`);
        dispatch(fetchTodoList());
        setTodoTask(defaultTodoTask);
      })
      .catch((error) => {
        console.log(`[AddNewTask] Error:`, error);
        alert(`New Task Added ${error.message}`);
      });
  };

  return (
    <div>
      <Modal
        className="AddTaskModal"
        show={addTaskViewProp.show}
        onHide={addTaskViewProp.handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-5 d-flex justify-content-center align-items-center">
          <div id="alert-holder"></div>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="What do you want to do?"
                value={todoTask.name}
                onChange={(e) =>
                  setTodoTask({
                    ...todoTask,
                    name: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mt-3" controlId="fromBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Add some description here."
                value={todoTask.description}
                onChange={(e) =>
                  setTodoTask({
                    ...todoTask,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
            <div className="d-flex my-4 justify-content-center">
              <Button variant="primary" type="submit">
                Add New Task
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export { AddTaskView };
