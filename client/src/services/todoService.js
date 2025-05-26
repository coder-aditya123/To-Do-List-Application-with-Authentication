// client/src/services/todoService.js
import api from './api'; // Axios instance ko import karein

const API_URL = '/todos'; // Backend todo routes ka base path

// Get all todos for the logged-in user
const getTodos = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    throw message;
  }
};

// Create a new todo
const createTodo = async (text) => {
  try {
    const response = await api.post(API_URL, { text });
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    throw message;
  }
};

// Update a todo (text or completed status)
const updateTodo = async (id, todoData) => { // todoData = { text: 'new text', completed: true }
  try {
    const response = await api.put(`${API_URL}/${id}`, todoData);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    throw message;
  }
};

// Delete a todo
const deleteTodo = async (id) => {
  try {
    const response = await api.delete(`${API_URL}/${id}`);
    return response.data; // Usually returns a success message
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    throw message;
  }
};

const todoService = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};

export default todoService;