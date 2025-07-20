const {errorHandler} = require("../utils/errorCodes");
const productsDb = require("../database/products");
const db = require('../database/orders');
const orderProductDb = require('../database/orderProducts');
const paymentDB = require('../database/payment');
const s3 = require('../s3/s3')
async function doOrder(req) {
    const {shopId, phoneNumber, month, year, yojna, products} = req.body;
    /**
     * products = [
     *   { productId: "64af...01", quantity: 2 },
     *   { productId: "64df...92", quantity: 1 }
     * ]
     */

    if (!shopId || !phoneNumber || !month || !year || !yojna || !products?.length) {
        return errorHandler("01", req);
    }

    // Fetch product details to calculate total
    const productIds = products.map(p => p.productId);
    const dbProducts = await productsDb.getProducts(req, {id: {in: productIds}})
    if (dbProducts.code) {
        return dbProducts
    }

    if (dbProducts.length !== products.length) {
        return errorHandler("02", req);
    }

    // Calculate total price
    let totalPrice = 0;
    for (const item of products) {
        const product = dbProducts.find(p => p.id === item.productId);
        totalPrice += product.rate * item.quantity;
    }

    // Create the order

    const order = await db.createOrder(req, {
        shop: {connect: {id: shopId}},
        phoneNumber,
        month,
        year,
        yojna,
        totalPrice
    });

    // Add OrderProduct entries
    const orderProductData = products.map(item => ({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity
    }));

    await orderProductDb.createOrderProducts(req, orderProductData)
    return {
        success: true,
        message: "Order placed successfully",
        orderId: order.id,
        totalPrice
    };
}

async function fetchOrder(req) {
    const {orderId} = req.params;
    if (!orderId) return errorHandler("03", req);
    const include = {
        shop: true,
        orderProducts: {
            include: {
                product: true
            }
        },
        payment: true
    }
    const order = await db.fetchOrder(req, {id: orderId}, include);

    if (!order) return errorHandler("04", req);
    if (order.code) return order;
    return {
        success: true,
        data: order
    };
}

async function getAllOrders(req) {
    const include = {
        shop: true,
        orderProducts: {
            include: {
                product: true
            }
        },
    }
    const orders = await db.getAllOrders(req, {}, include)
    return {
        success: true,
        count: orders.length,
        data: orders
    };
}

async function calculatePrice(req) {
    const {products} = req.body;

    /**
     * products = [
     *   { productId: "64af...", quantity: 2 },
     *   { productId: "64df...", quantity: 1 }
     * ]
     */

    if (!products || !Array.isArray(products) || products.length === 0) {
        return errorHandler("05", req);
    }

    const productIds = products.map(p => p.productId);
    const dbProducts = await productsDb.getProducts(req, {id: {in: productIds}})
    if (dbProducts.code) {
        return dbProducts
    }
    let totalPrice = 0;
    if (dbProducts.length !== products.length) {
        return errorHandler("02", req);
    }


    for (const item of products) {
        const product = dbProducts.find(p => p.id === item.productId);
        totalPrice += product.rate * item.quantity;
    }

    return {
        success: true,
        totalPrice
    };
}

async function paymentProof(req) {
    const {orderId} = req.params;
    const imageFile = req.file;
    if (!orderId || !imageFile) {
        return errorHandler("06", req);
    }

    // Check if order exists
    const order = await db.fetchOrder(req, {
        id: orderId
    },null)

    if (!order) {
        return errorHandler("04", req);
    }

    // Check if payment slip already exists


    const existing = await paymentDB.getPayment(req,{orderId:orderId});
    console.log(existing);
    if (existing) {
        return  errorHandler('07',req);
    }
    try {
        const key = `${orderId}.${imageFile.originalname.split(".").pop()}`;
        const s3Response = await s3.uploadBufferToS3(imageFile.buffer, key, imageFile.mimetype);
        // Store the payment slip
        const payment = await paymentDB.createPayment(req,{
            order: {connect: {id: orderId}},
            paymentProof: s3Response.Location
        })
        return{
            success: true,
            message: 'Payment proof uploaded successfully.',
            paymentSlipId: payment.id
        }
    }catch(err) {
        console.log(err);
        return errorHandler('11',req);
    }
}
async function getPaymentProof(req) {
    const {orderId} = req.params;
    if(!orderId) return errorHandler("03", req);
    const existing = await paymentDB.getPayment(req,{orderId:orderId});
    if (!existing) {return errorHandler('08',req)}
    return existing;
}
async function updateOrder(req) {
    const {orderId,status} = req.body;
    if(!orderId || !status) return errorHandler("03", req);
    const dbStatus = ['pending','accept','reject','completed'];
    if(!dbStatus.includes(status)){
        return errorHandler("10", req);
    }

    const whereCondition = {
        id:orderId
    }
    const data = {
        status: status,
    }
    const updates = await db.updateOrder(req,data,whereCondition);
    if(!updates) {
        return errorHandler("04", req);
    }
    if(updates.code) return updates;
    return {
        success: true,
        message: 'Order updated successfully.',
    }
}
async function fetchOrderCounts(req) {
    const statuses = ['pending','accept','reject'];
    const statues = await Promise.all(statuses.map( stat => {
        return  db.fetchOrderCounts(req,{
            status:stat
        })
    }))
    return {
        success: true,
        data: {
            pending: statues[0],
            accepted: statues[1],
            reject: statues[2],
        }
    }
}


module.exports = {
    fetchOrder,
    doOrder,
    getAllOrders,
    calculatePrice,
    paymentProof,
    getPaymentProof,
    updateOrder,
    fetchOrderCounts
}