import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Todo API Service
const todoService = {
  getAllTodos: () => apiClient.get('/todos'),
  getTodoById: (id) => apiClient.get(`/todos/${id}`),
  createTodo: (todo) => apiClient.post('/todos', todo),
  updateTodo: (id, todo) => apiClient.put(`/todos/${id}`, todo),
  deleteTodo: (id) => apiClient.delete(`/todos/${id}`),
  deleteAllTodos: () => apiClient.delete('/todos'),
  checkHealth: () => apiClient.get('/health')
};

export default todoService;