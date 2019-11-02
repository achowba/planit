const expect = require('expect');
const supertest = require('supertest');

const app = require('./../index');
const { users, populateUsers } = require('./seed/seed');


describe('SIGNUP api/v1/users/signup', () => {
	before(populateUsers); // populate the database before the tests are ran

	it('should create a new user', (done) => {
		supertest(app)
			.post('/api/v1/users/signup')
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.send(users[0])
			.expect((res) => {
				expect(res.body.status).toEqual("success");
				expect(res.body.createdUser._id).toBeDefined();
				expect(res.body.createdUser.username).toBe(users[0].username)
				expect(res.body.createdUser.email).toBe(users[0].email)
			})
			.expect(201)
			.then(function () {
				done();
			})
			.catch(function () {
				done();
			});
	})

	it('should expect email to already exist', (done) => {
		supertest(app)
			.post('/api/v1/users/signup')
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.send(users[1])
			.expect((res) => {
				expect(res.body.status).toEqual("error");
				expect(res.body.error).toBeDefined();
			})
			.expect(401)
			.then(function () {
				done();
			})
			.catch(function () {
				done();
			});
	});

	it('should not create a user if username, email and password are not provided', (done) => {
		supertest(app)
			.post('/api/v1/users/signup')
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.send({})
			.expect((res) => {
				expect(res.body.status).toEqual("error");
				expect(res.body.error).toBeDefined();
			})
			.expect(401)
			.then(function () {
				done();
			})
			.catch(function () {
				done();
			});
	});

});

describe('Login api/v1/users/login', () => {

	it('should login user if email and password are correct', (done) => {
		supertest(app)
			.post('/api/v1/users/login')
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.send({
				email: users[0].email,
				password: users[0].password,
			})
			.expect((res) => {
				expect(res.body.status).toEqual("success");
				expect(res.body.token).toBeDefined();
			})
			.expect(200)
			.then(function () {
				done();
			})
			.catch(function () {
				done();
			});
	});

	it('should not login user if password or email is wrong', (done) => {
		supertest(app)
			.post('/api/v1/users/login')
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.send({
				email: users[2].email,
				password: users[2].password,
			})
			.expect((res) => {
				expect(res.body.status).toEqual("error");
				expect(res.body.error).toBeDefined();
			})
			.expect(400)
			.then(function () {
				done();
			})
			.catch(function () {
				done();
			});
	});

});

