// client/src/components/ToDoItem/ToDoItem.jsx
import React from 'react';

function ToDoItem({ todo, onDelete, onToggleComplete }) {
  return (
    <div className={`flex items-center justify-between p-4 bg-white rounded-lg shadow-sm mb-3 ${todo.completed ? 'opacity-70 line-through' : ''}`}>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleComplete(todo._id, !todo.completed)}
          className="form-checkbox h-5 w-5 text-blue-600 mr-3 cursor-pointer"
        />
        <span className="text-lg text-gray-800">{todo.text}</span>
      </div>
      <button
        onClick={() => onDelete(todo._id)}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
      >
        Delete
      </button>
    </div>
  );
}

export default ToDoItem;