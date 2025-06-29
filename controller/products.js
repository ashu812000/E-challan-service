const {createProduct, getAllProductsWithoutRate} = require('../helper/products');
const {respond} = require("../middleware/respond");
const {errorHandler} = require("../utils/errorCodes");

exports.addProduct = async (req, res) => {
    try {
        const savedProduct = await createProduct(req, res);
        respond(res, savedProduct);
    } catch (error) {
        console.log(error);
        respond(res,errorHandler("500",req))
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await getAllProductsWithoutRate(req);
        respond(res, products);
    } catch (error) {
        console.log(error);
        respond(res,errorHandler('500',req))
    }
};
