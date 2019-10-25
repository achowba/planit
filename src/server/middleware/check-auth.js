const jwt = required('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        let token = req.body.token;
        const decoded = jwt.verify(token, process.env.JWT_KEY); // verify and decode the token
        req.userData = decoded;
        next(); // call next to run next middleware if use is authenticated
    } catch (err) {
        return res.status(401).json({
            message: 'Authentication Failed'
        });
    }
};
