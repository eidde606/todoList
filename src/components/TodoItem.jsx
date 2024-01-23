import DeleteIcon from "@mui/icons-material/Delete";
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

const TodoItem = ({ todo, toggleTodo, deleteTodo }) => {
  return (
    <ListItem
      dense
      style={{
        backgroundColor: "#E6E6FA",
        marginBottom: 10,
        borderRadius: "4px",
        display: "flex", // Use flexbox to arrange items horizontally
        alignItems: "center", // Align items in the center
      }}
    >
      <Checkbox
        checked={todo.completed}
        onChange={() => toggleTodo(todo._id)}
        color="primary"
      />
      <ListItemText
        primary={
          <Typography
            variant="body1"
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.text}
          </Typography>
        }
      />
      <ListItemText
        primary={
          <Typography variant="body2">
            Date:{" "}
            {todo.date ? new Date(todo.date).toLocaleDateString("en-US") : ""}
          </Typography>
        }
      />
      <ListItemText
        primary={
          <Typography variant="body2">
            Time: {todo.time ? `${todo.time}` : ""}
          </Typography>
        }
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" onClick={() => deleteTodo(todo._id)}>
          <DeleteIcon color="error" style={{ color: "#483D8B" }} />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TodoItem;
