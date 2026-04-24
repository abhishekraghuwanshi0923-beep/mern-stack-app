import React from 'react';
import './TodoItem.css';

const TodoItem = ({ todo, onToggle, onEdit, onDelete }) => {
  return (
    <div className="todo-item">
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id, todo.completed)}
          className="todo-checkbox"
        />
        <div className="todo-text">
          <h3 className={todo.completed ? 'completed' : ''}>
            {todo.title}
          </h3>
          {todo.description && (
            <p className="todo-description">{todo.description}</p>
          )}
          <span className="todo-date">
            {new Date(todo.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="todo-actions">
        <button
          onClick={() => onEdit(todo)}
          className="btn btn-edit"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="btn btn-delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;