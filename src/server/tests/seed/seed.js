const mongoose = require('mongoose');

const User = require('./../../models/user');
const Todo = require('./../../models/todo');
const { jwtUser } = require('./../../utils/auth');

const users = [{
	_id: new mongoose.Types.ObjectId(),
	username: "Eddard Stark",
	email: "stark@test.com",
	password: "userpassword1",
	get token () {
		return jwtUser(this.email, this._id)
	}
}, {
	_id: new mongoose.Types.ObjectId(),
	username: "Jon Snow",
	email: "snow@test.com",
	password: "userpassword2",
	get token () {
		return jwtUser(this.email, this._id)
	}
}, {
	_id: new mongoose.Types.ObjectId(),
	username: "Wrong User",
	email: 'wronguser@test.com',
	password: 'wrongpassword',
}];

const todos = [{
	_id: new mongoose.Types.ObjectId(),
    title: "First Todo Title",
	description: "First Todo Description",
	createdBy: users[0].email
}, {
	_id: new mongoose.Types.ObjectId(),
    title: "Second Todo Title",
	description: "Second Todo Description",
	createdBy: users[1].email
}, {
	_id: new mongoose.Types.ObjectId(),
    title: "Wrong Todo Title",
	description: "Wrong Todo Description",
}];

let user1 = new User(users[0]);
let todo1 = new Todo(todos[0]);

const populateUsers = (done) => {
	User.deleteMany({}).then(async () => {
		try {
			let userOne = await user1.save();
			if (userOne) done();
		} catch (e) {
			done(e);
		}
    });
};

const populateTodos = (done) => {
	Todo.deleteMany({}).then(async () => {
		try {
			let todoOne = await todo1.save();
			if (todoOne) done();
		} catch (e) {
			done(e);
		}
	});
};

module.exports = {
    todos,
    populateTodos,
    users,
    populateUsers
};

