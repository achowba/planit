// this was done to prevent the mongoDB object ID from being used in the front end
function generateQueryId() {
	let result = '';
	for (var i = process.env.QUERY_ID_LENGTH; i > 0; --i) {
		result += process.env.QUERY_ID_CHARACTERS[Math.floor(Math.random() * process.env.QUERY_ID_CHARACTERS.length)];
	}

	console.log('The String is: ', result);
	return result;
}

module.exports = {
	generateQueryId
}
