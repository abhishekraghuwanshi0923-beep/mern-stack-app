import React, { useState } from 'react';
import './TodoForm.css';

const TodoForm = ({ onSubmit, initialTodo = null, isLoading = false }) => {
  const [title, setTitle] = useState(initialTodo?.title || '');
  const [description, setDescription] = useState(initialTodo?.description || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Title is required');
      return;
    }
    onSubmit({ title: title.trim(), description: description.trim() });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-group">
        <input
          type="text"
          placeholder="Enter todo title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
          disabled={isLoading}
        />
      </div>
      <div className="form-group">
        <textarea
          placeholder="Enter description (optional)..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-textarea"
          rows="3"
          disabled={isLoading}
        ></textarea>
      </div>
      <button
        type="submit"
        className="btn-submit"
        disabled={isLoading}
      >
        {isLoading ? 'Saving...' : initialTodo ? 'Update Todo' : 'Add Todo'}
      </button>
    </form>
  );
};

export default TodoForm;