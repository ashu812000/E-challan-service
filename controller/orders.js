const helper= require('../helper/orders')
const {respond} = require("../middleware/respond");
const {errorHandler} = require("../utils/errorCodes");
const orders = {
    doOrder: async (req, res) => {
        try {
            const order = await helper.doOrder(req);
            respond(res, order);
        }catch (err) {
            console.log(err)
            respond(res,errorHandler('500',req))
        }
    },
    fetchOrder: async (req, res) => {
        try {
            const order = await helper.fetchOrder(req);
            respond(res, order);
        }catch (err) {
            console.log(err)
            respond(res,errorHandler('500',req))
        }
    },
    getAllOrders : async (req, res) => {
        try {
            const orders = await helper.getAllOrders();
            respond(res, orders);
        }catch (err) {
            console.log(err)
            respond(res,errorHandler('500',req))
        }
    },
    calculatePrice : async (req, res) => {
        try {
            const price = await helper.calculatePrice(req);
            console.log("price calculated", price);
            respond(res, price);
        }catch (err) {
            console.log(err)
            respond(res,errorHandler('500',req))
        }
    },
    paymentProof : async (req, res) => {
        try {
            const proof = await helper.paymentProof(req);
            console.log("got payment proof", proof);
            respond(res, proof);
        }catch (err) {
            console.log(err)
            respond(res,errorHandler('500',req))
        }
    },
    getPaymentProof: async (req, res) => {
        try {
            const proof = await helper.getPaymentProof(req);
            console.log("got payment proof", proof);
            respond(res, proof);
        }catch (err) {
            console.log(err)
            respond(res,errorHandler('500',req))
        }
    }
}
module.exports = orders;