const http = require('http');
// const throttle = require("express-throttle-requests");

const app = require('./app');

/* const port = process.env.PORT || 4000;
const server = http.createServer(app);

server.listen((port), () => {
	console.log(`App running on Port: ${port}`);
}); */

app.set( 'port', (process.env.PORT || 4000));
app.listen( app.get( 'port' ), function() {
	console.log( `Node server is running on Port: ${app.get('port')}`);
});
