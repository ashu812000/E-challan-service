const {createProduct, getAllProductsWithoutRate} = require('../helper/products');

exports.addProduct = async (req, res) => {
    try {
        const savedProduct = await createProduct(req, res);
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({error: 'Failed to create product', details: error.message});
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await getAllProductsWithoutRate();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch products', details: error.message});
    }
};
