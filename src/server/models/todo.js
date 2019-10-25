const mongoose = require('mongoose');

// create a schema for the todo model
const todoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
		default: false
	},
	createdOn: {
		type: String,
		required: false,
		default: new Date().toISOString()
	},
	createdBy: {
		type: String,
		required: true,
	},
	modifiedOn: {
		type: String,
		required: false,
	},
});

module.exports = mongoose.model('Todo', todoSchema);
