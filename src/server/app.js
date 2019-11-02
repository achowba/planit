require('dotenv').config();
require('./utils/db-config');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

const todoRoutes = require('./routes/todos');
const userRoutes = require('./routes/users');

// set headers to allow cors
app.use((req, res, next) => {

    res.header('Access-Control-Allow-Origin', '*'); // replace localhost with actual host
	res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, PATCH, POST, DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');

	if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}

	next(); // move to the next middleware
});

/* middlewares */
app.use(express.static(path.join(__dirname, 'public'))); // configure url for static folder
/* app.get('*', (req, res) => {
	return res.sendFile(path.join(__dirname, 'public/index.html'));
}); */

// configure bodyParser middleware
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

// allow cors
app.use(cors());

// create routes
app.use('/api/v1/todos', todoRoutes); // forward all request aimed at /api/v1/todos to todoRoutes
app.use('/api/v1/users', userRoutes); // forward all request aimed at api/v1/users to userRoutes

// middleware to handle 404 errors
app.use((req, res, next) => {
	const error = new Error('Route Does Not Exist 😢');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,
		}
	});
});

module.exports = app;
