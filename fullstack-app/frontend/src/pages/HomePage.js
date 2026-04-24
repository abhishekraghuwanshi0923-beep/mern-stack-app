import React, { useEffect, useState } from 'react';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import useTodos from '../hooks/useTodos';
import './HomePage.css';

const HomePage = () => {
  const { todos, loading, error, fetchTodos, addTodo, updateTodo, removeTodo, toggleTodo } = useTodos();
  const [editingTodo, setEditingTodo] = useState(null);
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAddTodo = async (todoData) => {
    const result = await addTodo(todoData.title, todoData.description);
    if (result) setEditingTodo(null);
  };

  const handleUpdateTodo = async (todoData) => {
    if (!editingTodo) return;
    await updateTodo(editingTodo.id, todoData);
    setEditingTodo(null);
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      await removeTodo(id);
    }
  };

  const completedCount = todos.filter(t => t.completed).length;
  const totalCount = todos.length;

  return (
    <div className="home-page">
      <div className="page-header">
        <h1>📝 Todo Manager</h1>
        <p className="subtitle">Manage your tasks efficiently</p>
      </div>

      {(error || localError) && (
        <ErrorMessage
          message={error || localError}
          onDismiss={() => setLocalError(null)}
        />
      )}

      <div className="stats">
        <div className="stat-card">
          <h3>Total</h3>
          <p className="stat-number">{totalCount}</p>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <p className="stat-number">{completedCount}</p>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <p className="stat-number">{totalCount - completedCount}</p>
        </div>
      </div>

      <TodoForm
        onSubmit={editingTodo ? handleUpdateTodo : handleAddTodo}
        initialTodo={editingTodo}
        isLoading={loading}
      />

      {editingTodo && (
        <div className="editing-info">
          Editing: <strong>{editingTodo.title}</strong>
          <button onClick={() => setEditingTodo(null)} className="btn-cancel">
            Cancel
          </button>
        </div>
      )}

      {loading && !editingTodo ? (
        <Loading />
      ) : todos.length === 0 ? (
        <div className="empty-state">
          <p>No todos yet. Create one to get started!</p>
        </div>
      ) : (
        <div className="todos-list">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;