const express = require('express');
const router = express.Router();
const {addProduct, getProducts} = require('../controller/products');
const verifyAuth = require('../middleware/authmiddleware');

router.post('/addProducts', verifyAuth, addProduct);
router.get('/allProducts', getProducts);


module.exports = router;
