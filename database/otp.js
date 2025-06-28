const {defaultCtx} = require("../utils/context");
const db = require('./database');
const {errorHandler} = require("../utils/errorCodes");
const upsertOtp = async (req, where, createData, updateData, ctx = defaultCtx) => {
    console.log("upsert ok");
    try {
        console.log("line 7");
        const otp = await db.upsert(ctx, "Otp", where, createData, updateData);
        console.log("otp is ::",otp)
        return otp;
    } catch (err) {
        console.log("error handler:", err);
        return errorHandler("500", req);
    }
};
const verify = async (req, where, ctx = defaultCtx) => {
    try {
        const otp = await db.findUnique(ctx, "Otp", where);
        return otp// Returns the newly created form
    } catch (err) {
        return errorHandler("500", req)
    }
}
const deleteOtp = async (req, where, ctx = defaultCtx) => {
    try {
        const otp = await db.delete(ctx, "Otp", where);
        return otp// Returns the newly created form
    } catch (err) {
        return errorHandler("500", req)
    }
}

module.exports = {
    upsertOtp,
    verify,
    deleteOtp
}