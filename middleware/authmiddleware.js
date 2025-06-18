const { verifyToken } = require('../helper/auth');

function verifyAuth(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized. Login required.' });
    }

    try {
        const decoded = verifyToken(token);
        req.admin = decoded; // optional usage
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
}

module.exports = verifyAuth;
