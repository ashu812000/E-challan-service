const express = require('express');
const router = express.Router();
const {login, logout,register,isAuthenticated,forgotPassword} = require('../controller/auth');

router.post('/login', login);
router.get('/logout', logout);
router.post('/register', register);
router.get('/isAuthenticated', isAuthenticated);
router.post('/forgotPassword', forgotPassword);

module.exports = router;
