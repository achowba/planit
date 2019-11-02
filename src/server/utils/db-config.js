const mongoose = require('mongoose');

// connect to db
let db = mongoose.connection;
if (process.env.NODE_ENV === 'test') {
	connectDB(process.env.TEST_DB_URL);
} else {
	connectDB(process.env.DB_URL);
}


// listen for DB connect event
db.on('open', () => {
	console.log('Database Connected!');
});

// listen for DB connection error event
db.on('error', (error) => {
	console.log(`Failed to connect to Database. \n${error}`);
});

function connectDB (dbURL) {
	mongoose.connect(dbURL, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	});
}
