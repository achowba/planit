const mongoose = require('mongoose');

// connect to db
let db = mongoose.connection;
mongoose.connect(`${process.env.DB_URL}`, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
});

// listen for DB connect event
db.on('open', () => {
	console.log('Database Connected!');
});

// listen for DB connection error event
db.on('error', (error) => {
	console.log(`Failed to connect to Database. \n${error}`);
});
