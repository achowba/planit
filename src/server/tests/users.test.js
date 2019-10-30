const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const app = require('./../index');
// const userRoute = require('./../controllers/users');
const { User } = require('./../models/user');
// const { users, populateUsers } = require('./seed/seed');

// beforeEach(populateUsers);

describe('SIGNUP api/v1/users', () => {

	it('should create a user', (done) => {
		let username = 'validusername';
		let email = 'validuser@test.com';
		let password = 'userpassword';

		request(app)
			.post('/login')
			.send({
				email,
				password
			})
			.expect(404)
			.expect((res) => {
				// expect(res.body._id).toExist();
				expect(res.body.username).toBe(undefined)
				expect(res.body.email).toBe(undefined)
			})
			.end((err) => {
				if (err) {
					return done(err);
				}

				User.find({email}).then((user) => {
					expect(user).toExist();
					expect(user.password).toNotBe(password);
					done();
				}).catch((e) => {
					done(e);
				});
			});
	});

});
