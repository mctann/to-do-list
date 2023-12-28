import { useState } from "react";
import { Button, Form, ListGroup, Modal } from "react-bootstrap";
import { CheckCircle, Circle } from "react-bootstrap-icons";

function App() {
  const initialToDos = [
    {
      title: "Double check gas/water",
      isActive: true,
    },
    {
      title: "Take out trash",
      isActive: true,
    },
    {
      title: "Call mom",
      isActive: true,
    },
  ];
  const [todos, setTodos] = useState(initialToDos);
  const [currentDate] = useState(new Date());

  const [currentTodo, setCurrentTodo] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (event) => setCurrentTodo(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentTodo === "") {
      setError("Input field cannot be empty.");
    } else {
      const newTodo = {
        title: currentTodo,
        isActive: true,
      };
      setTodos([...todos, newTodo]);
      setCurrentTodo("");
      setError("");
    }
    handleClose();
  };

  const handleDelete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = {
      ...updatedTodos[index],
      isActive: false,
    };
    setTodos(updatedTodos);
  };

  const getDayName = (inputDate) => {
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayIndex = inputDate.getDay();
    return dayNames[dayIndex];
  };

  return (
    <div className="to-do-container container-md">
      <div className="to-do-header">
        <div className="d-flex align-items-center">
          <h1 className="text-center text-date">{currentDate.getDate()}</h1>
          <div>
            <span className="d-block text-month">
              {currentDate.toLocaleString("default", { month: "short" })}
            </span>
            <span className="text-year">{currentDate.getFullYear()}</span>
          </div>
        </div>
        <div className="text-uppercase">{getDayName(currentDate)}</div>
      </div>
      <ListGroup>
        {todos.map((todo, index) => (
          <ListGroup.Item key={index} className="to-do-list-group">
            {todo.isActive ? todo.title : <del>{todo.title}</del>}
            <Button
              className="float-right"
              variant="link"
              size="sm"
              onClick={() => handleDelete(index)}
            >
              {todo.isActive ? <Circle /> : <CheckCircle />}
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <div className="add-btn">
        <Button onClick={handleShow}>Add Todo</Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new todo</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="todoForm.ControlTextarea1" className="mb-4">
              <Form.Label>Enter new todo</Form.Label>

              <Form.Control
                as="textarea"
                rows={2}
                value={currentTodo}
                onChange={handleChange}
              />

              {error && <Form.Text className="text-danger">{error}</Form.Text>}
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
