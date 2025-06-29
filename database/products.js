const db = require('./database');
const {defaultCtx} = require("../utils/context");
const {errorHandler} = require("../utils/errorCodes");
const getProducts = async (req, where, ctx = defaultCtx) => {
    try {
        const products = await db.findMany(ctx, "Product", where);
        return products// Returns the newly created form
    } catch (err) {
        console.log(err)
        return errorHandler("500", req)
    }
}
const addProduct = async (req, data, ctx = defaultCtx) => {
    try {
        const products = await db.create(ctx, "Product", data);
        return products// Returns the newly created form
    } catch (err) {
        console.log(err);
        return errorHandler("500", req)
    }
}
module.exports = {
    getProducts,
    addProduct
}