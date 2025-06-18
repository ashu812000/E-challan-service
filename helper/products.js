const Product = require('../models/products');

async function createProduct(req, res) {
    const {name, rate, description} = req.body;
    if (!name || rate === undefined) {
        return res.status(400).json({error: 'Name and rate are required'});
    }
    const newProduct = new Product({name, rate, description});
    return await newProduct.save();
}

async function getAllProductsWithoutRate() {
    return await Product.find({});  // Exclude 'rate'
}

module.exports = {createProduct, getAllProductsWithoutRate};
