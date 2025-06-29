const {defaultCtx} = require("../utils/context");
const db = require("./database");
const {errorHandler} = require("../utils/errorCodes");

async function createOrderProducts(req,data,ctx = defaultCtx){
    try {
        const order = await db.createMany(ctx,'OrderProduct',data);
        console.log("created order",order);
        return order;
    }catch (err) {
        console.log(err)
        return errorHandler('500',req)
    }
}
module.exports = {
    createOrderProducts
}