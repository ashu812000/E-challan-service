const jwt = require('jsonwebtoken');
const {errorHandler} = require("../utils/errorCodes");
const SECRET_KEY = process.env.SECRET_KEY;
const db = require('../database/auth')
const {hashPassword} = require("../utils/functions");
function generateToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });
}

function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY);
}

const login = async (req, res) => {
    const {email, password} = req.body;

    // Input validation
    if (!email || !password) {
        return errorHandler('01',req);
    }
    console.log("comes 01")
        const userDetails = await db.login(req,{
            email: email,
        })
        if (!userDetails) {
            return errorHandler('02',req);
        }
        console.log("comes for hashed password", password, "user details password are :: ",userDetails);
        const hashedPassword = hashPassword(password);
        if (hashedPassword !== userDetails.password) {
            return errorHandler('03',req);
        }
        const token = generateToken({
            id: userDetails.id, email: userDetails.email,
            name: userDetails.name,
        });
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // use true in production with HTTPS
            maxAge: 60 * 60 * 1000,
        });

        return {
            statusCode: 200,
            message: 'Login successfully',
        }

}
async function register(req){
    const {email, password,name} = req.body;
    if (!email || !password) {
        return errorHandler('01',req);
    }
    const hashedPassword = hashPassword(password);
    const existingUser = await db.findAdmin(req,{
        email: email,
    })
    if (!existingUser) {
        const userDetails = await db.register(req,{
            email: email,
            password: hashedPassword,
            name: name,
        });
        console.log("userDetails registered", userDetails);
        if (!userDetails) {
            return errorHandler('02',req);
        }
        if(userDetails.code)return userDetails
        return {
            statusCode: 200,
            message: 'Register successfully.',
        }
    }else {
        if(existingUser.code) {return existingUser}
        return errorHandler('06',req);
    }
}
async function forgotPassword(req){
    const {email, password} = req.body;
    return {
        statusCode: 400,
        message: 'Implementation is pending',
    }
}
async function isAuthenticated(req){
    const token = req.cookies['token'];
    if (!token) {
        return errorHandler('04',req);
    }
    try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        return {
            statusCode: 200,
            message: 'Authentication successfully',
            user :  user
        }
    }catch(err){
        console.log(err);
        return errorHandler('05',req);
    }
}


module.exports = {
    verifyToken, login,register, forgotPassword,isAuthenticated
};
