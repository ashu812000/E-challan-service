const jwt = require('jsonwebtoken');
const Admin = require("../models/adminAuth");
const SECRET_KEY = process.env.SECRET_KEY;

function generateToken(payload) {
    return jwt.sign(payload, SECRET_KEY, {expiresIn: '1hr'});
}

function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY);
}

const login = async (req, res) => {
    const {email, password} = req.body;

    // Input validation
    if (!email || !password) {
        return res.status(400).json({message: 'Email and password are required.'});
    }

    try {
        const userDetails = await Admin.findOne({email});
        if (!userDetails) {
            return res.status(404).json({message: 'Admin not found'});
        }

        if (password !== userDetails.password) {
            return res.status(401).json({message: 'Invalid password'});
        }

        const token = generateToken({id: userDetails._id, email: userDetails.email});

        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // use true in production with HTTPS
            maxAge: 60 * 60 * 1000,
        });

        res.status(200).json({message: 'Login successful'});
    } catch (err) {
        res.status(500).json({message: 'Server error', error: err.message});
    }

}

module.exports = {verifyToken, login};
