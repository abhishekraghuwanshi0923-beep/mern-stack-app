const express = require('express');
const TodoController = require('../controllers/TodoController');

const router = express.Router();

// GET all todos
router.get('/', TodoController.getAllTodos);

// GET single todo
router.get('/:id', TodoController.getTodoById);

// POST create todo
router.post('/', TodoController.createTodo);

// PUT update todo
router.put('/:id', TodoController.updateTodo);

// DELETE todo
router.delete('/:id', TodoController.deleteTodo);

// DELETE all todos
router.delete('/', TodoController.deleteAllTodos);

module.exports = router;