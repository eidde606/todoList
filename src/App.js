import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import TodoList from "./components/TodoList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<TodoList />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
