const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const { Todo } = require('./../../models/todo');
const User = require('./../../models/user');

const users = [{
	_id: new mongoose.Types.ObjectId(),
	username: "Eddard Stark",
	email: "stark@test.com",
	password: "userpassword1"
}, {
	_id: new mongoose.Types.ObjectId(),
	username: "Jon Snow",
	email: "snow@test.com",
	password: "userpassword2"
}, {
	_id: new mongoose.Types.ObjectId(),
	username: "Wrong User",
	email: 'wronguser@test.com',
	password: 'wrongpassword',
}];

const todos = [{
	_id: new mongoose.Types.ObjectId(),
    title: "First Test Todo",
	description: "First Test Description",
	completed: true
}, {
	_id: new mongoose.Types.ObjectId(),
    title: "Second Test Todo",
	description: "Second Test Description",
	completed: false
}];

let user1 = new User(users[0]);

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => {
        done();
    });
};

const populateUsers = (done) => {
	User.deleteMany({}).then(async () => {
		try {
			let userOne = await user1.save();

			done();
			if (userOne) {
			}

		} catch (e) {
			done(e);
		}
    })
};

module.exports = {
    todos,
    populateTodos,
    users,
    populateUsers
};

