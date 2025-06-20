const twilio = require('twilio');
const config = require('../config/twilio');
const client = twilio(config.accountSid, config.authToken);

// In-memory OTP store
const otpStore = new Map();

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

exports.sendOTP = async (phoneNumber) => {
  const otp = generateOTP();
  otpStore.set(phoneNumber, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });

  const message = await client.messages.create({
    body: `Your OTP is: ${otp}`,
    from: config.phoneNumber,
    to: phoneNumber
  });

  return message;
};

exports.verifyOTP = (phoneNumber, otp) => {
  const data = otpStore.get(phoneNumber);
  if (!data) return false;

  const isValid = data.otp === otp && Date.now() < data.expiresAt;
  if (isValid) otpStore.delete(phoneNumber);
  return isValid;
};
