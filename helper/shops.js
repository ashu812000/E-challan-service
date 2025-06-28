const Shop = require('../models/shopModel');
const {errorHandler} = require("../utils/errorCodes");
const db = require('../database/shop');
async function createShop(data) {
    const newShop = new Shop(data);
    const savedShop = await newShop.save();
    return savedShop;
}

async function getShops(req) {
    const shopNumber = req.params.shopNumber;
    if(!shopNumber){
        return errorHandler('01',req);
    }
    const shop = await db.fetchShop(req,{
        shopNumber: shopNumber,
    })
    if(!shop){return errorHandler('02',req)}
    if(shop.code)return shop
    return shop
}

module.exports = {createShop, getShops};
