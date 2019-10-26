const mongoose = require('mongoose');

const Todo = require('./../models/todo');

// get all todos
exports.getAllTodos = async (req, res, next) => {
    try {

        let todos = await Todo.find({
			createdBy: req.headers['x-current-user']
		}).select('_id title description completed createdOn createdBy modifiedOn');

        if (!todos) {
            return res.status(404).json({
                status: "error",
                message: "No Todos Found",
            });
		}

        const response = {
			status: "success",
			count: todos.length,
			todos,
        }

		res.status(200).json(response);

    } catch (err) {
		console.log(err);
        res.status(500).json({
            err: err.message
        });
    }
}

// post a new todo
exports.createTodo = async (req, res, next) => {

	const todo = new Todo({
		_id: new mongoose.Types.ObjectId(),
		title: req.body.title,
		description: req.body.description,
		completed: req.body.completed,
		createdBy: req.headers['x-current-user'],
		createdOn: new Date().toISOString(),
    });

    try {

        let createdTodo = await todo.save();

        res.status(201).json({
            status: "success",
            newTodo: {
				title: createdTodo.title,
				description: createdTodo.description,
				completed: createdTodo.completed,
				createdBy: createdTodo.createdBy,
				createdOn: createdTodo.createdOn,
				modifiedOn: createdTodo.modifiedOn
            }
        });

    } catch (err) {
        res.status(400).json({
            status: "error",
            err: err.message
        });
    }
}

// get a single todo
exports.getTodo = async (req, res, next) => {
	const id = req.params.todoId;

    try {
        let todo = await Todo.findOne({
			_id: id,
			createdBy: req.headers['x-current-user']
		}).select('_id title description completed createdOn createdBy modifiedOn');

        if (!todo) {
            return res.status(404).json({
                status: "error",
                message: "No valid entry found for provided ID",
            });
        }

        res.status(200).json({
			status: "success",
			todo,
            /* todo: {
				_id: todo._id,
				title: todo.title,
				description: todo.description,
				completed: todo.completed,
				createdOn: todo.createdOn,
				createdBy: todo.createdBy,
            } */
        });

    } catch (err) {
        res.status(500).send({
            status: "error",
            err: err.message
        });
    }
}

// update a todo
exports.updateTodo = async (req, res, next) => {
	let id = req.params.todoId;
	let updateOps = {};

	/* if (req.body.todoId) {
		id = req.body.todoId;
	} else {
		id = req.params.todoId;
	} */

    for (const ops of Object.keys(req.body)) {
        updateOps[ops] = req.body[ops];
    }

	updateOps = {
		...updateOps,
		modifiedOn: new Date().toISOString()
	}

    try {

        let updatedTodo = await Todo.findOneAndUpdate(
            {
				_id: id,
				createdBy: req.headers['x-current-user']
            }, {
                $set: updateOps
            }, {
				new: true
			}
        );

        res.status(200).json({
			status: "success",
            updatedTodo: {
				_id: updatedTodo._id,
				title: updatedTodo.title,
				description: updatedTodo.description,
				completed: updatedTodo.completed,
				createdOn: updatedTodo.createdOn,
				createdBy: updatedTodo.createdBy,
				modifiedOn: updatedTodo.modifiedOn,
            }
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            err: err.message
        });
    }
}

// delete a todo
exports.deleteTodo = async (req, res, next) => {
	let id = req.params.todoId;

	/* if (req.body.todoId) {
        id = req.body.todoId;
    } else {
        id = req.params.todoId;
    } */

    try {

        let deletedTodo = await Todo.findByIdAndDelete({
			_id: id,
			createdBy: req.headers['x-current-user']
		});

        if (!deletedTodo) {
            return res.status(404).json({
                status: "error",
                message: "Todo Not Found",
            });
        }

        res.status(200).json({
            status: "success",
            deletedTodo: {
				_id: deletedTodo._id,
				title: deletedTodo.title,
				description: deletedTodo.description,
				completed: deletedTodo.completed,
				createdOn: deletedTodo.createdOn,
				createdBy: deletedTodo.createdBy,
            }
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            err: err.message
        });
    }
}
