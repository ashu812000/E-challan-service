const Shop = require('../models/shopModel');

async function createShop(data) {
    const newShop = new Shop(data);
    const savedShop = await newShop.save();
    return savedShop;
}

async function getAllShops(req) {
    const shops = await Shop.findOne({shopNumber: req.params.id});
    return shops;
}

module.exports = {createShop, getAllShops};
