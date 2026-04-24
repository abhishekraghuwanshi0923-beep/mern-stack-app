import { useState, useCallback } from 'react';
import todoService from '../services/todoService';

const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await todoService.getAllTodos();
      setTodos(response.data.data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addTodo = useCallback(async (title, description) => {
    setError(null);
    try {
      const response = await todoService.createTodo({ title, description });
      setTodos([...todos, response.data.data]);
      return response.data.data;
    } catch (err) {
      setError(err.message);
      console.error('Error adding todo:', err);
    }
  }, [todos]);

  const updateTodo = useCallback(async (id, updates) => {
    setError(null);
    try {
      const response = await todoService.updateTodo(id, updates);
      setTodos(todos.map(t => t.id === id ? response.data.data : t));
      return response.data.data;
    } catch (err) {
      setError(err.message);
      console.error('Error updating todo:', err);
    }
  }, [todos]);

  const removeTodo = useCallback(async (id) => {
    setError(null);
    try {
      await todoService.deleteTodo(id);
      setTodos(todos.filter(t => t.id !== id));
    } catch (err) {
      setError(err.message);
      console.error('Error deleting todo:', err);
    }
  }, [todos]);

  const toggleTodo = useCallback(async (id, completed) => {
    await updateTodo(id, { completed: !completed });
  }, [updateTodo]);

  return {
    todos,
    loading,
    error,
    fetchTodos,
    addTodo,
    updateTodo,
    removeTodo,
    toggleTodo
  };
};

export default useTodos;