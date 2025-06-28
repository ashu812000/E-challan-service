const otpService = require('../services/otpService');
const {respond} = require("../middleware/respond");
const {errorHandler} = require("../utils/errorCodes");

exports.sendOTP = async (req, res) => {
  try {
    let result = await otpService.sendOTP(req);
    respond(res, result);
  } catch (err) {
    console.log(err)
    respond(res, errorHandler('500',req));
  }
};

exports.verifyOTP = async (req, res) => {
  try{
    const valid = await otpService.verifyOtp(req);
    respond(res, valid);
  }catch(err){
    console.log(err)
    respond(res, errorHandler('500',req));
  }
};
