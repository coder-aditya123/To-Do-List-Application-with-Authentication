// client/src/pages/DashboardPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import todoService from '../services/todoService'; // Import todoService
import ToDoItem from '../components/ToDoItem.jsx/ToDoItem';
import AddToDoForm from '../components/AddToDOForm';

function DashboardPage() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, logout } = useContext(AuthContext); // logout ko bhi destructure kar liya
  // useNavigate hook yahan direct use nahi ho raha, but future ke liye pata hona chahiye.
  // const navigate = useNavigate();

  // Fetch todos from the backend
  useEffect(() => {
    const fetchTodos = async () => {
      if (!user) { // Ensure user is available before fetching
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        // Ab yahan सीधे `todoService` ka function use karenge
        const fetchedTodos = await todoService.getTodos();
        setTodos(fetchedTodos);
        setError('');
      } catch (err) {
        console.error('Error fetching todos:', err);
        const errorMessage = (err && err.message) || 'Failed to fetch todos.';
        setError(errorMessage);
        // Agar token expired ho ya unauthorized ho, toh logout kar de user ko
        // Ye AuthContext.jsx mein bhi handle ho sakta hai api.js interceptor ke through
        // but yahan bhi ek check laga sakte hain for specific scenarios.
        if (err.response && err.response.status === 401) {
            logout(); // User ko force logout karein agar unauthorized error aaye
            // navigate('/login'); // Login page par redirect (agar navigate import kiya ho)
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [user, logout]); // `logout` ko dependency array mein add kiya

  // Add a new todo
  const handleAddTodo = async (text) => {
    try {
      const newTodo = await todoService.createTodo(text);
      setTodos([...todos, newTodo]); // Add new todo to the list
      setError('');
    } catch (err) {
      console.error('Error adding todo:', err);
      const errorMessage = (err && err.message) || 'Failed to add todo.';
      setError(errorMessage);
    }
  };

  // Delete a todo
  const handleDeleteTodo = async (id) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(todos.filter((todo) => todo._id !== id)); // Remove todo from the list
      setError('');
    } catch (err) {
      console.error('Error deleting todo:', err);
      const errorMessage = (err && err.message) || 'Failed to delete todo.';
      setError(errorMessage);
    }
  };

  // Toggle todo complete status
  const handleToggleComplete = async (id, completed) => {
    try {
      const updatedTodo = await todoService.updateTodo(id, { completed });
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, completed: updatedTodo.completed } : todo
        )
      );
      setError('');
    } catch (err) {
      console.error('Error toggling todo:', err);
      const errorMessage = (err && err.message) || 'Failed to update todo status.';
      setError(errorMessage);
    }
  };

  if (loading) {
    return <div className="text-center text-xl mt-8">Loading todos...</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl mt-8">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
        Your To-Do List
      </h1>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
      <AddToDoForm onAddTodo={handleAddTodo} />
      {todos.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No todos yet! Add one above.</p>
      ) : (
        <div className="space-y-4">
          {todos.map((todo) => (
            <ToDoItem
              key={todo._id}
              todo={todo}
              onDelete={handleDeleteTodo}
              onToggleComplete={handleToggleComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default DashboardPage;