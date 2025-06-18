const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rate: { type: Number, required: true },
    description: String,
    createdAt: { type: Date, default: Date.now }
});

const Products = mongoose.model('Product', productSchema);
module.exports = Products;
