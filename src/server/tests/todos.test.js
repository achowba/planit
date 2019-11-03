const expect = require('expect');
const supertest = require('supertest');

const app = require('./../index');
const { todos, users, populateTodos } = require('./seed/seed');

before(populateTodos);
describe('TODOS /api/v1/todos', function () {

	it('should create a todo', function (done) {
		supertest(app)
			.post('/api/v1/todos')
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.set('Authorization', `Bearer ${users[1].token}`)
			.set('X-Current-User', todos[1].createdBy)
			.send(todos[1])
			.expect((res) => {
				expect(res.body.status).toEqual("success");
				expect(res.body.newTodo._id).toBeDefined()
				expect(res.body.newTodo.title).toEqual(todos[1].title)
				expect(res.body.newTodo.description).toEqual(todos[1].description)
				expect(res.body.newTodo.completed).toEqual(false)
				expect(res.body.newTodo.createdBy).toEqual(users[1].email)
				expect(res.body.newTodo.createdOn).toBeDefinEqtoEqual()
				expect(res.body.newTodo.modifiedOn).toEqual(null)
			})
			.expect(201)
			.then(function () {
				done();
			})
			.catch(function () {
				done();
			});
	});

	it('should get all todos created by a user', function (done) {
		supertest(app)
			.get('/api/v1/todos')
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.set('Authorization', `Bearer ${users[0].token}`)
			.set('X-Current-User', todos[0].createdBy)
			.expect((res) => {
				expect(res.body.status).toEqual("success");
				expect(res.body.count).toEqual(1);
				expect(res.body.todos[0].title).toEqual("First Todo Title");
				expect(res.body.todos[0].createdBy).toEqual(users[0].token);
			})
			.expect(200)
			.then(function () {
				done();
			})
			.catch(function () {
				done();
			});
	});

});

describe('TODO /api/v1/todos/:id', function () {

	it('should get a todo created by a user', function (done) {
		supertest(app)
			.get(`/api/v1/todos/${todos[0]._id}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.set('Authorization', `Bearer ${users[0].token}`)
			.set('X-Current-User', todos[0].createdBy)
			.expect((res) => {
				expect(res.body.status).toEqual("success");
			})
			.expect(200)
			.then(function () {
				done();
			})
			.catch(function () {
				done();
			});
	});

	it('should update a todo', function (done) {
		supertest(app)
		.patch(`/api/v1/todos/${todos[0]._id}`)
		.set('Content-Type', 'application/json')
		.set('Accept', 'application/json')
			.set('Authorization', `Bearer ${users[0].token}`)
			.set('X-Current-User', todos[0].createdBy)
			.send({
				title: "Updated Title",
				description: "Updated Description"
			})
			.expect((res) => {
				expect(res.body.status).toEqual("success");
				expect(res.body.updatedTodos._id).toEqual(todos[0]._id);
				expect(res.body.updatedTodos.title).toEqual("Updated Title");
				expect(res.body.updatedTodos.description).toEqual("Updated Description");
			})
			.expect(200)
			.then(function () {
				done();
			})
			.catch(function () {
				done();
			});
		});

	it('should delete a todo', function (done) {
		supertest(app)
			.delete(`/api/v1/todos/${todos[0]._id}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.set('Authorization', `Bearer ${users[0].token}`)
			.set('X-Current-User', todos[0].createdBy)
			.expect((res) => {
				expect(res.body.status).toEqual("success");
				expect(res.body.deletedTodo._id).toEqual(todos[0]._id);
				expect(res.body.deletedTodo.title).toEqual(todos[0].title);
				expect(res.body.deletedTodo.description).toEqual(todos[0].description);
				expect(res.body.deletedTodo.createdBy).toEqual(users[0].email);
			})
			.expect(200)
			.then(function () {
				done();
			})
			.catch(function () {
				done();
			});
	});

});
