import {
  Alert,
  Button,
  Container,
  List,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get("http://localhost:5001/todos");
    setTodos(response.data);
  };

  const addTodo = async () => {
    if (newTodo.trim() !== "") {
      await axios.post("http://localhost:5001/todos", {
        text: newTodo,
        completed: false,
        date: selectedDate,
        time: selectedTime,
      });
      fetchTodos();
      setNewTodo("");
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 20);
    } else {
      setShowMessage(true);
    }
  };

  const toggleTodo = async (_id) => {
    try {
      const response = await axios.put(`http://localhost:5001/todos/${_id}`);
      if (response.data && response.data._id) {
        fetchTodos();
      } else {
        console.error("Error updating todo: Invalid response format");
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (_id) => {
    if (!_id || typeof _id !== "string") {
      console.error("Invalid Todo ID");
      return;
    }

    try {
      await axios.delete(`http://localhost:5001/todos/${_id}`);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: 20 }}>
      <Paper elevation={3} style={{ padding: 20, backgroundColor: "purple" }}>
        <Typography
          variant="h4"
          gutterBottom
          style={{ textAlign: "center", color: "white" }}
        >
          Todo List
        </Typography>
        <div style={{ marginBottom: 16 }}>
          <TextField
            type="text"
            variant="outlined"
            label="New Task"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            fullWidth
            style={{
              marginBottom: 10,
              backgroundColor: "white",
              borderRadius: "4px",
              height: "55px",
              borderColor: "red",
            }}
          />
          <div style={{ display: "flex" }}>
            <TextField
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              style={{
                marginRight: 10,
                backgroundColor: "white",
                borderRadius: "5px",
                height: "55px",
              }}
            />

            <TextField
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              style={{
                marginRight: 10,
                backgroundColor: "white",
                borderRadius: "5px",
              }}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={addTodo}
            style={{ marginTop: 10, backgroundColor: "#4B0082" }}
          >
            Add Task
          </Button>
        </div>
        {showMessage && (
          <Alert severity="warning" style={{ marginBottom: 16 }}>
            Please enter a task before adding.
          </Alert>
        )}
        <List>
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default TodoList;