const express = require('express');
const router = express.Router();
const controller = require('../controller/otpController');

router.post('/send', controller.sendOTP);
router.post('/verify', controller.verifyOTP);

module.exports = router;
