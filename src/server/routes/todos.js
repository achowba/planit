const express = require('express');
const router = express.Router(); // create a router object to handle routes

const { checkAuth } = require('./../utils/auth');
const TodoController = require('./../controllers/todos');

// get all todos
router.get('/', checkAuth, TodoController.getAllTodos);

// add a new todo
router.post('/', checkAuth, TodoController.createTodo);

// get a single todo
router.get('/:todoId', checkAuth, TodoController.getTodo);

router.patch('/:todoId', checkAuth, TodoController.updateTodo);

// delete a todo
router.delete('/:todoId', checkAuth, TodoController.deleteTodo);

module.exports = router;
