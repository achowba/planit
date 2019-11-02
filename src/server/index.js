const app = require('./app');

let port = '';

if (process.env.NODE_ENV == 'test') {
	port = process.env.TEST_PORT || 3400;
} else {
	port = process.env.PORT || 4000;
}

app.set('port', port);
app.listen(app.get('port'), function() {
	console.log( `Server is running on Port: ${app.get('port')}`);
});

module.exports = app;
