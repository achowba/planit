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
		required: true,
		default: false
	},
	createdOn: {
		type: String,
		required: false,
		default: new Date.toISOString()
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User' // use this to connect the productId from the Product doc
	},
});

module.exports = mongoose.model('Todo', todoSchema);
