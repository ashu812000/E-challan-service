const twilio = require('twilio');
const config = require('../config/twilio');
const {generateOTP,isValidPhoneNumber,hashOtp} = require('../utils/functions')
const {errorHandler} = require("../utils/errorCodes");
const otpDb = require('../database/otp')
;


exports.sendOTP = async (req) => {
  const { phoneNumber } = req.body;
  const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
  console.log("onfig.accountSid ::::",config.accountSid)
  console.log("onfig.authToken :::",config.authToken)
  console.log("process.env :::::",process.env.TWILIO_SID);
  console.log("env :::",process.env.TWILIO_AUTH_TOKEN);
  console.log("config :::",config);

  // Validate input
  if (!phoneNumber) return errorHandler('02', req);
  if (!isValidPhoneNumber(phoneNumber)) return errorHandler('03', req);

  // Generate and hash OTP
  const otp = generateOTP(); // should be like '123456'
  const hashedOtp = hashOtp(otp);

  const now = new Date();
  const expiresAt = new Date(now.getTime() + 5 * 60 * 1000); // 5 mins

  const data = {
    identifier: phoneNumber,
    otpHash: hashedOtp,
    createdAt: now,
    expiresAt,
  };

  // Upsert OTP record in DB


  // Send OTP via SMS
  const  twillioRes =  await client.messages.create({
    body: `Your OTP is: ${otp}`,
    from: config.phoneNumber,
    to: phoneNumber
  });
  if(twillioRes.code)return twillioRes
  const result = await otpDb.upsertOtp(req,
      { identifier: phoneNumber }, // where
      data,                        // createData
      { otpHash: hashedOtp, createdAt: now, expiresAt } // updateData
  );
  if (result.code) return result;
  return {
    status : "success",
    message : "OTP sent successfully",
  }
};


exports.verifyOtp = async (req) => {
  const { phoneNumber, otp } = req.body;

  // Input validation
  if (!phoneNumber || !otp) return errorHandler('02', req);
  if (!isValidPhoneNumber(phoneNumber)) return errorHandler('03', req);

  // Fetch OTP from DB
  const otpRecord = await otpDb.verify(req, { identifier: phoneNumber });
  if (!otpRecord) {
    return errorHandler('04', req);
  }
  if(otpRecord.code)return otpRecord;

  // Check expiry
  if (new Date() > otpRecord.expiresAt) {
    await otpDb.deleteOtp(req, { identifier: phoneNumber }); // Optional cleanup
    return errorHandler('05', req);
  }

  // Compare hash
  const inputOtpHash = hashOtp(otp);
  if (otpRecord.otpHash !== inputOtpHash) {
    return errorHandler('06', req);
  }

  // OTP is valid — delete it
  await otpDb.deleteOtp(req, { identifier: phoneNumber });
  return {
    success: true,
    message: 'OTP verified successfully'
  };
};

