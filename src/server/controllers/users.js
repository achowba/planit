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
			return res.status(400).json({
				status: "error",
				message: "Email Already Exists!"
			});
		}

        let user = new User ({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        let createdUser = await user.save();

        res.status(201).send({
            status: "success",
            createdUser: {
                _id: createdUser._id,
                username: createdUser.username,
                email: createdUser.email,
                password: createdUser.password
            }
        });

    } catch (err) {
        res.status(400).send({
            status: "error",
            err: "Failed to Create User.",
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
		let token = jwtUser(user[0].email, user[0].password);

        if (!user || user.length == 0 || !userPassword) {
            return res.status(401).json({
                status: "error",
                message: "Authentication Failed."
            });
		}

        return res.status(200).json({
			status: "success",
			message: "Authentication Successful.",
			username: user[0].username,
			email: user[0].email,
            token,
        });

    } catch (err) {
		return res.status(400).send({
			status: "error",
			err: "Authentication Failed.",
        });
    }
}
