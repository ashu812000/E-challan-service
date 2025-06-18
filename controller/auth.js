const {login} = require('../helper/auth');

exports.login = async (req, res) => {
    return await login(req, res);
};

exports.logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({message: 'Logout successful'});
};
