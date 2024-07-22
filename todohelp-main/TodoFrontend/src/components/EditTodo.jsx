import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTodo } from './TodoContext';

const EditTodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { todos, setTodos } = useTodo();
  
  const [task, setTask] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    const taskToEdit = todos.find(task => task.id === parseInt(id, 10));
    if (taskToEdit) {
      setTask(taskToEdit);
    }
  }, [id, todos]);

  const handleInputChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const updatedTasks = todos.map(t => (t.id === parseInt(id, 10) ? task : t));
    setTodos(updatedTasks);
    navigate('/todo');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-blue-500 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <a onClick={() => navigate('/')} className="cursor-pointer text-xl font-bold">
            Task Manager
          </a>
          <div>
            <a onClick={() => navigate('/login')} className="mr-4 cursor-pointer hover:text-gray-300">
              Login
            </a>
            <a onClick={() => navigate('/signup')} className="cursor-pointer hover:text-gray-300">
              Signup
            </a>
          </div>
        </div>
      </nav>
      <div className="bg-white p-8 rounded-lg shadow-md w-96 mx-auto mt-4">
        <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
        <form className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="bg-white border border-gray-300 rounded-lg py-2 px-4 block w-full"
              value={task.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              className="bg-white border border-gray-300 rounded-lg py-2 px-4 block w-full"
              value={task.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTodo;
