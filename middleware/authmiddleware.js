const { verifyToken } = require('../helper/auth');

function verifyAuth(req, res, next) {
    const token = req.cookies.token;
    console.log("token ::::::::",token);
    if (!token) {
        return res.status(401).send({
            status: 401,
            message: 'No token provided',
        })
    }
    try {
        verifyToken(token);
        next();
    } catch (err) {
        console.log("err::::", err);
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
}

module.exports = verifyAuth;
