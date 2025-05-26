// server/controllers/todoController.js
import asyncHandler from 'express-async-handler';
import Todo from '../models/Todo.js';

// @desc    Get all todos for the authenticated user
// @route   GET /api/todos
// @access  Private
const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({ user: req.user._id }); // Find todos associated with the logged-in user
  res.json(todos);
});

// @desc    Create a new todo
// @route   POST /api/todos
// @access  Private
const createTodo = asyncHandler(async (req, res) => {
  const { text } = req.body;

  if (!text) {
    res.status(400);
    throw new Error('Please add a text field');
  }

  const todo = new Todo({
    user: req.user._id,
    text,
  });

  const createdTodo = await todo.save();
  res.status(201).json(createdTodo);
});

// @desc    Update a todo
// @route   PUT /api/todos/:id
// @access  Private
const updateTodo = asyncHandler(async (req, res) => {
  const { text, completed } = req.body;

  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(404);
    throw new Error('Todo not found');
  }

  // Make sure the logged in user owns the todo
  if (todo.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to update this todo');
  }

  todo.text = text || todo.text; // Update text if provided
  todo.completed = completed !== undefined ? completed : todo.completed; // Update completed status if provided

  const updatedTodo = await todo.save();
  res.json(updatedTodo);
});

// @desc    Delete a todo
// @route   DELETE /api/todos/:id
// @access  Private
const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(404);
    throw new Error('Todo not found');
  }

  // Make sure the logged in user owns the todo
  if (todo.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to delete this todo');
  }

  await todo.deleteOne(); // Use deleteOne() for Mongoose 6+
  res.json({ message: 'Todo removed' });
});

export { getTodos, createTodo, updateTodo, deleteTodo };