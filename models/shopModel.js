const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
    district: String,
    block: String,
    gramPanchayat: String,
    shopkeeperName: String,
    shopNumber: String,
    cardType: String,
    cardCount: Number
});

const Shop = mongoose.model('Shop', shopSchema);
module.exports = Shop;
