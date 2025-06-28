const crypto = require('crypto');
function hashOtp(otp) {
    return crypto.createHash('sha256').update(otp).digest('hex');
}
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
function isValidPhoneNumber(phone) {
    return /^\+91[6-9]\d{9}$/.test(phone);
}
module.exports ={
    hashOtp,
    generateOTP,
    isValidPhoneNumber
}