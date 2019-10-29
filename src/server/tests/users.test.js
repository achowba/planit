const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const userRoute = require('./../controllers/users');
const { Todo } = require('./../models/todo');
const { users, populateUsers } = require('./seed/seed');

// beforeEach(populateUsers);

describe('SIGNUP api/v1/users', () => {

	it('should create a user', (done) => {
		let username = 'validusername';
		let email = 'validuser@test.com';
		let password = 'userpassword';

		request(app)
			.post('api/v1/users/login')
			.send({
				email,
				password
			})
			.expect(200)
			.expect((res) => {
				expect(res.body._id).toExist();
				expect(res.body.username).toBe(username)
				expect(res.body.email).toBe(email)
			})
			.end((err) => {
				if (err) {
					return done(err);
				}

				User.findOne({email}).then((user) => {
					expect(user).toExist();
					expect(user.password).toNotBe(password);
					done();
				}).catch((e) => {
					done(e);
				});
			});
	});

});
