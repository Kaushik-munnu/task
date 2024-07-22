import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Replace with your Google Client ID
const CLIENT_ID = '180129916367-deaml6c3vk22d6ic9jgjc53o2g95g4fq.apps.googleusercontent.com';

const Navbar = ({ onLogout }) => {
  return (
    <nav className="bg-blue-500 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Task Manager</h1>
        <div className="flex items-center">
          <button
            onClick={onLogout}
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mr-4"
          >
            Logout
          </button>
          <GoogleLogin
            clientId={CLIENT_ID}
            buttonText="Login with Google"
            onSuccess={(response) => {
              console.log('Login Success:', response);
              localStorage.setItem('authToken', response.tokenId);
              window.location.href = '/todo';
            }}
            onFailure={(response) => {
              console.log('Login Failure:', response);
            }}
            cookiePolicy={'single_host_origin'}
            className="bg-white text-black font-bold py-2 px-4 rounded"
          />
        </div>
      </div>
    </nav>
  );
};

const TodoCard = ({ task, onDelete, onEdit }) => {
  return (
    <div className="bg-blue-100 p-4 rounded-md shadow-md mb-4">
      <h3 className="text-lg font-bold mb-2">{task.title}</h3>
      <p className="text-gray-700 mb-2">{task.description}</p>
      <p className="text-gray-500 mb-2">Created at: {task.createdAt}</p>
      <div className="flex justify-end">
        <button
          onClick={() => onEdit(task.id)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const Todo = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([
    { id: 1, title: 'Task 1', description: 'Description 1', createdAt: '01/09/2021, 05:30:00' },
    { id: 2, title: 'Task 2', description: 'Description 2', createdAt: '01/09/2021, 05:30:00' },
    { id: 3, title: 'Task 3', description: 'Description 3', createdAt: '01/09/2024, 05:30:00' },
  ]);

  const [inProgress, setInProgress] = useState([
    { id: 4, title: 'Task 4', description: 'Description 4', createdAt: '01/09/2024, 05:30:00' },
    { id: 5, title: 'Task 5', description: 'Description 5', createdAt: '01/09/2021, 05:30:00' },
  ]);

  const [done, setDone] = useState([
    { id: 6, title: 'Task 6', description: 'Description 6', createdAt: '01/09/2021, 05:30:00' },
  ]);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
  });

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const addTask = () => {
    const newTodo = {
      id: todos.length + 1,
      title: newTask.title,
      description: newTask.description,
      createdAt: new Date().toLocaleDateString(),
    };
    setTodos([...todos, newTodo]);
    setNewTask({ title: '', description: '' });
  };

  const deleteTask = (id, list) => {
    if (list === 'todos') {
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    } else if (list === 'inProgress') {
      const updatedInProgress = inProgress.filter((todo) => todo.id !== id);
      setInProgress(updatedInProgress);
    } else if (list === 'done') {
      const updatedDone = done.filter((todo) => todo.id !== id);
      setDone(updatedDone);
    }
  };

  const editTask = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const source = result.source;
    const destination = result.destination;

    // Reorder tasks within the same list
    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === 'todos') {
        const items = Array.from(todos);
        const [reorderedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, reorderedItem);
        setTodos(items);
      } else if (source.droppableId === 'inProgress') {
        const items = Array.from(inProgress);
        const [reorderedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, reorderedItem);
        setInProgress(items);
      } else if (source.droppableId === 'done') {
        const items = Array.from(done);
        const [reorderedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, reorderedItem);
        setDone(items);
      }
    } else {
      // Move tasks between lists
      if (source.droppableId === 'todos' && destination.droppableId === 'inProgress') {
        const [movedItem] = todos.splice(source.index, 1);
        setTodos([...todos]);
        setInProgress([...inProgress, movedItem]);
      } else if (source.droppableId === 'inProgress' && destination.droppableId === 'done') {
        const [movedItem] = inProgress.splice(source.index, 1);
        setInProgress([...inProgress]);
        setDone([...done, movedItem]);
      } else if (source.droppableId === 'todos' && destination.droppableId === 'done') {
        const [movedItem] = todos.splice(source.index, 1);
        setTodos([...todos]);
        setDone([...done, movedItem]);
      } else if (source.droppableId === 'inProgress' && destination.droppableId === 'todos') {
        const [movedItem] = inProgress.splice(source.index, 1);
        setInProgress([...inProgress]);
        setTodos([...todos, movedItem]);
      } else if (source.droppableId === 'done' && destination.droppableId === 'inProgress') {
        const [movedItem] = done.splice(source.index, 1);
        setDone([...done]);
        setInProgress([...inProgress, movedItem]);
      } else if (source.droppableId === 'done' && destination.droppableId === 'todos') {
        const [movedItem] = done.splice(source.index, 1);
        setDone([...done]);
        setTodos([...todos, movedItem]);
      }
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <Navbar onLogout={handleLogout} />
      <h1 className="text-3xl font-bold mb-4">Task Manager</h1>

      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            className="border border-gray-300 px-4 py-2 rounded-md mr-2"
            value={newTask.title}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            className="border border-gray-300 px-4 py-2 rounded-md mr-2"
            value={newTask.description}
            onChange={handleInputChange}
          />
          <button
            onClick={addTask}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Task
          </button>
        </div>
      </div>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Droppable droppableId="todos">
            {(provided) => (
              <div
                className="bg-blue-200 p-4 rounded-md shadow-md"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h2 className="text-2xl font-bold mb-4">TODO</h2>
                {todos.map((todo, index) => (
                  <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <TodoCard
                          task={todo}
                          onDelete={() => deleteTask(todo.id, 'todos')}
                          onEdit={editTask}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="inProgress">
            {(provided) => (
              <div
                className="bg-blue-200 p-4 rounded-md shadow-md"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h2 className="text-2xl font-bold mb-4">IN PROGRESS</h2>
                {inProgress.map((todo, index) => (
                  <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <TodoCard
                          task={todo}
                          onDelete={() => deleteTask(todo.id, 'inProgress')}
                          onEdit={editTask}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="done">
            {(provided) => (
              <div
                className="bg-blue-200 p-4 rounded-md shadow-md"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h2 className="text-2xl font-bold mb-4">DONE</h2>
                {done.map((todo, index) => (
                  <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <TodoCard
                          task={todo}
                          onDelete={() => deleteTask(todo.id, 'done')}
                          onEdit={editTask}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Todo;