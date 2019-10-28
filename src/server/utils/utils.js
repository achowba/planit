// this was done to prevent the mongoDB object ID from being used in the front end
function generateQueryId() {
	let result = '';
	for (var i = process.env.QUERY_ID_LENGTH; i > 0; --i) {
		result += process.env.QUERY_ID_CHARACTERS[Math.floor(Math.random() * process.env.QUERY_ID_CHARACTERS.length)];
	}

	return result;
}

// function checkCurrentUser (req, res, next) {
module.exports = (req, res, next) => {
	if (!req.headers['x-current-user']) {
		return res.status(401).json({
			message: 'User Email Not Provided'
		});
	}
	next();
}

module.exports = {
	generateQueryId,
	checkCurrentUser
}
