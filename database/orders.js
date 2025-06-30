const {respond} = require("../middleware/respond");
const {errorHandler} = require("../utils/errorCodes");
const {defaultCtx} = require("../utils/context");
const db = require("./database");
async function doOrder(req){
    try {

    }catch (err) {
        console.log(err)
       return errorHandler('500',req)
    }
}
async function createOrder(req,data,ctx = defaultCtx){
    try {
        const order = await db.create(ctx,'Order',data);
        console.log("created order",order);
        return order;

    }catch (err) {
        console.log(err)
        return errorHandler('500',req)
    }
}
async function fetchOrder(req,where,include,ctx = defaultCtx){
    try {
        const order = await db.findUnique(ctx,'Order',where,include);
        console.log("order found",order);
        return order;
    }catch (err) {
        console.log(err)
        return errorHandler('500',req)
    }
}
async function getAllOrders(req,where,include,ctx = defaultCtx){
    try {
        const orders = await db.findMany(ctx,'Order',where,include);
        console.log("order found",orders);
        return orders;
    }catch (err) {
        console.log(err)
        return errorHandler('500',req)
    }
}
async function updateOrder(req,data,where,ctx = defaultCtx){
    try {
        const orders = await db.update(ctx,'Order',where,data);
        console.log("order updated",orders);
        return orders;
    }catch (err) {
        console.log(err)
        return errorHandler('500',req)
    }
}
async function fetchOrderCounts(req,where,ctx = defaultCtx){
    try {
        const count = await db.count(ctx,'Order',where);
        console.log(`count for ${where} :::::",count`);
        return count;
    }catch (err) {
        console.log(err)
        return errorHandler('500',req)
    }
}

module.exports = {
    fetchOrder,
    doOrder,
    getAllOrders,
    createOrder,
    updateOrder,
    fetchOrderCounts
}