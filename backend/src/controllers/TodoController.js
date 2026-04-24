const Todo = require('../models/Todo');
const storage = require('../utils/storage');

class TodoController {
  // GET all todos
  static async getAllTodos(req, res, next) {
    try {
      const todos = await storage.readTodos();
      res.json({
        success: true,
        data: todos,
        count: todos.length
      });
    } catch (error) {
      next(error);
    }
  }

  // GET single todo by ID
  static async getTodoById(req, res, next) {
    try {
      const { id } = req.params;
      const todos = await storage.readTodos();
      const todo = todos.find(t => t.id === id);

      if (!todo) {
        return res.status(404).json({
          success: false,
          message: 'Todo not found'
        });
      }

      res.json({
        success: true,
        data: todo
      });
    } catch (error) {
      next(error);
    }
  }

  // POST create new todo
  static async createTodo(req, res, next) {
    try {
      const { title, description } = req.body;

      if (!title || title.trim() === '') {
        return res.status(400).json({
          success: false,
          message: 'Title is required'
        });
      }

      const newTodo = new Todo(title.trim(), description || '');
      const todos = await storage.readTodos();
      todos.push(newTodo);
      await storage.writeTodos(todos);

      res.status(201).json({
        success: true,
        data: newTodo,
        message: 'Todo created successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT update todo
  static async updateTodo(req, res, next) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const todos = await storage.readTodos();
      const todoIndex = todos.findIndex(t => t.id === id);

      if (todoIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Todo not found'
        });
      }

      const updatedTodo = todos[todoIndex];
      Object.assign(updatedTodo, {
        ...updates,
        updatedAt: new Date().toISOString()
      });
      todos[todoIndex] = updatedTodo;
      await storage.writeTodos(todos);

      res.json({
        success: true,
        data: updatedTodo,
        message: 'Todo updated successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE todo
  static async deleteTodo(req, res, next) {
    try {
      const { id } = req.params;

      const todos = await storage.readTodos();
      const todoIndex = todos.findIndex(t => t.id === id);

      if (todoIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Todo not found'
        });
      }

      todos.splice(todoIndex, 1);
      await storage.writeTodos(todos);

      res.json({
        success: true,
        message: 'Todo deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE all todos
  static async deleteAllTodos(req, res, next) {
    try {
      await storage.writeTodos([]);
      res.json({
        success: true,
        message: 'All todos deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TodoController;