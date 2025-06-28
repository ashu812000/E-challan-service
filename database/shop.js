const {defaultCtx} = require("../utils/context");
const db = require('./database');
const {errorHandler} = require("../utils/errorCodes");
const fetchShop = async (req, where, ctx = defaultCtx) => {
    try {
        const shop = await db.findUnique(ctx,'Shop',where);
        return shop
    } catch (err) {
        console.log(err)
        return errorHandler("500", req)
    }
}
module.exports = {
    fetchShop,
}