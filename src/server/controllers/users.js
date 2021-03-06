const mongoose = require('mongoose');

const User = require('./../models/user');
const { hashPassword, comparePassword, jwtUser } = require('./../utils/auth');

// create a new user
exports.createUser = async (req, res, next) => {

	try {
		let hashedPassword = await hashPassword(req.body.password);
		let existingUser = await User.find({
			email: req.body.email
		});

		if (existingUser.length > 0) {
			return res.status(401).json({
				status: "error",
				error: "Email Already Exists!"
			});
		}

        let user = new User ({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        let createdUser = await user.save();

		return res.status(201).send({
            status: "success",
            createdUser: {
                _id: createdUser._id,
                username: createdUser.username,
                email: createdUser.email,
                // password: createdUser.password
            }
        });

    } catch (err) {
		// console.log('There was an error from controller: ', err);
        return res.status(400).send({
            status: "error",
            error: "Failed to Create User.",
        });
    }
}

// authenticate/log user in
exports.loginUser = async (req, res, next) => {

	let email = req.body.email;
	let password = req.body.password;

	try {
		let user = await User.find({email,});
		let userPassword = await comparePassword(password, user[0].password);
		let token = jwtUser(user[0].email, user[0]._id);

        if (!user || user.length == 0 || !userPassword) {
            return res.status(400).json({
                status: "error",
				error: "Wrong Password or Email.",
            });
		}

        return res.status(200).json({
			status: "success",
			username: user[0].username,
			email: user[0].email,
            token,
        });

    } catch (err) {
		return res.status(400).send({
			status: "error",
			error: "Authentication Failed.",
			// error: err.message

        });
    }
}
