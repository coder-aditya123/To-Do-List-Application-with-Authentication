// server/models/Todo.js
import mongoose from 'mongoose';

const todoSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // Link to the User model
    required: true,
    ref: 'User',
  },
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
}, {
  timestamps: true,
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;