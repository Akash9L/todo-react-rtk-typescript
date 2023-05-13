import { useAppDispatch } from "app/hooks";
import { fetchTodoList } from "features/TodoList/TodoList.slice";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "./AddTask.scss";
import { addTodo } from "API";
import { Task, TaskStatusEnum } from "type.dto";

export type IAddTaskViewProps = {
  handleClose: () => void;
  show: boolean;
};

const AddTaskView: React.FC<IAddTaskViewProps> = (addTaskViewProp) => {
  const defaultTodoTask: Omit<Task, "id"> = {
    name: "",
    description: "",
    status: TaskStatusEnum.TODO,
  };
  const [todoTask, setTodoTask] = useState(defaultTodoTask);

  const dispatch = useAppDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // 👇️ prevent page refresh
    event.preventDefault();
    addTodo(todoTask)
      .then((response) => {
        alert(`New Task Added`);
        dispatch(fetchTodoList());
        setTodoTask(defaultTodoTask);
      })
      .catch((error) => {
        alert(`${error.message}`);
      });
  };

  return (
    <div>
      <Modal
        id="AddTaskModal"
        show={addTaskViewProp.show}
        onHide={addTaskViewProp.handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3 row">
          <div id="alert-holder"></div>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                autoFocus
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
