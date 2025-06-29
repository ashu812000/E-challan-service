const Product = require('../models/products');
const {errorHandler} = require("../utils/errorCodes");
const db = require('../database/products')

async function createProduct(req, res) {
    const {name, rate, productId, unit, description} = req.body;
    if (!name || rate === undefined || !productId || !unit) {
        return errorHandler('02', req)
    }
    const data = {
        name: name,
        rate: rate,
        unit: unit,
        description: description,
        productId : productId,
    }
    const newProduct = await db.addProduct(req, data)
    if (newProduct.code) return newProduct;
    return {
        status: 'success',
        message: 'Product added Successfully'
    }
}

async function getAllProductsWithoutRate(req) {
    const where = {}
    const products = await db.getProducts(req, where);
    if (products.code) return products;
    if (products && products.length) {
        return products.map(product => {
            return {
                name: product.name,
                id: product.id,
                description: product.description,
                productId : product.productId,
            }
        })
    }
    return []
}

module.exports = {createProduct, getAllProductsWithoutRate};
