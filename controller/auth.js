const {login} = require('../helper/auth');
const {respond} = require("../middleware/respond");
const {errorHandler} = require("../utils/errorCodes");
const helper = require('../helper/auth')
exports.login = async (req, res) => {
    try {
        const user = await helper.login(req,res);
        console.log("logged in user", user);
        respond(res,user);
    }catch (error) {
        console.error(error);
        respond(res,errorHandler('500',req));
    }
};

exports.logout = async (req, res) => {
    res.clearCookie('token',{
        httpOnly: true,
        secure: false,
    });
    res.status(200).json({message: 'Logout successful'});
};
exports.register = async (req, res) => {
    try {
        const user = await helper.register(req);
        console.log("user registered", user);
        respond(res,user);
    }catch (error) {
        console.log(error);
        respond(res,errorHandler('500',req));
    }
}
exports.forgotPassword = async (req, res) => {
    try {
        const response = await helper.forgotPassword(req);
        console.log("forgotPassword", response);
        respond(res,response);
    }catch (error) {
        console.error(error);
        respond(res,errorHandler('500',req));
    }
}
exports.isAuthenticated = async (req, res) => {
    try {
        const user = await helper.isAuthenticated(req);
        respond(res,user);
    }catch (error) {
        console.error(error);
        respond(res,errorHandler('500',req));
    }
}
