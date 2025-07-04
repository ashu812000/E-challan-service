const express = require('express');
const router = express.Router();
const {createShopRecord, getShopRecords} = require('../controller/shops');
const verifyAdminAuth = require('../middleware/authmiddleware');

router.post('/registerShop', verifyAdminAuth, createShopRecord);
router.get('/shopDetail/:shopNumber', getShopRecords);

module.exports = router;
