import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Todo from './components/Todo';
import EditTodo from './components/EditTodo';
import { TodoProvider } from './components/TodoContext'; // Import TodoProvider

const App = () => {
  const isAuthenticated = !!localStorage.getItem('authToken');

  return (
    <Router>
      <TodoProvider> {/* Wrap the Routes with TodoProvider */}
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/todo" /> : <Login />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/todo" /> : <Login />} />
          <Route path="/signup" element={isAuthenticated ? <Navigate to="/todo" /> : <Signup />} />
          <Route path="/todo" element={isAuthenticated ? <Todo /> : <Navigate to="/login" />} />
          <Route path="/edit/:id" element={isAuthenticated ? <EditTodo /> : <Navigate to="/login" />} />
        </Routes>
      </TodoProvider>
    </Router>
  );
};

export default App;
