const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function hashPassword (password) {
    const saltRounds = 10;

    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function(err, hash) {
            if (err) {
                reject(err);
            }

            resolve(hash);
        });
    });

    return hashedPassword;
}

async function comparePassword (password, userPassword) {
    const comparedPassword = await new Promise((resolve, reject) => {
        bcrypt.compare(password, userPassword, function(err, result) {
            if (err) {
                reject(err);
            }

            resolve(result);
        });

    });

    return comparedPassword;
}

function jwtUser (userEmail, userId) {
    const token = jwt.sign({
        email: userEmail,
        userId,
    }, process.env.JWT_KEY, {
        expiresIn: "24h"
    });

    return token;
}

const checkAuth = (req, res, next) => {
    try {
		if (!req.headers.authorization) {
			return res.status(401).json({
				message: 'Authentication Failed',
				errorMessage: 'Token Not Found'
			});
		}

		const token = req.headers.authorization.split(' ')[1];
		const decoded = jwt.verify(token, process.env.JWT_KEY); // verify and decode the token
		req.userData = decoded;
		next(); // call next to run next middleware if user is authenticated
    } catch (err) {
        // return an error response that if user is not authenticated
        return res.status(401).json({
            message: 'Authentication Failed',
            errorMessage: err.message
        });
    }
}

module.exports = {
    hashPassword,
    comparePassword,
    jwtUser,
    checkAuth
};
