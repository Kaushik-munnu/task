import React, { createContext, useContext, useState } from 'react';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([
    { id: 1, title: 'Task 1', description: 'Description 1', createdAt: '01/09/2021, 05:30:00' },
    { id: 2, title: 'Task 2', description: 'Description 2', createdAt: '01/09/2021, 05:30:00' },
    { id: 3, title: 'Task 3', description: 'Description 3', createdAt: '01/09/2024, 05:30:00' },
  ]);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);
