const {respond} = require("../middleware/respond");
const {errorHandler} = require("../utils/errorCodes");
const {defaultCtx} = require("../utils/context");
const db = require("./database");

async function getPayment (req, where, ctx = defaultCtx)  {
    try {
        const paymentProof = await db.findUnique(ctx,'PaymentSlip',where);
        return paymentProof;
    } catch (err) {
        console.log(err)
        return errorHandler('500', req);
    }

}

async function createPayment(req, data, ctx = defaultCtx)  {
    try {
        const paymentProof = await db.create(ctx, "PaymentSlip", data);
        console.log("paymentProof", paymentProof);
        return paymentProof;
    } catch (err) {
        console.log(err)
        return errorHandler('500', req);
    }

}

module.exports = {
    getPayment,
    createPayment,
}