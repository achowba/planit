const http = require('http');
// const throttle = require("express-throttle-requests");

const app = require('./app');

const port = process.env.PORT || 2806;
const server = http.createServer(app);

server.listen((port));
