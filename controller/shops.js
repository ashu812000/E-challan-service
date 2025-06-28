const {createShop, getShops} = require('../helper/shops');
const {respond} = require("../middleware/respond");
const {errorHandler} = require("../utils/errorCodes");

exports.createShopRecord = async (req, res) => {
    try {
        const savedShop = await createShop(req.body);
        res.status(201).json(savedShop);
    } catch (error) {
        res.status(500).json({error: 'Failed to create shop record', details: error.message});
    }
};

exports.getShopRecords = async (req, res) => {
    try {
        const shops = await getShops(req);
        respond(res, shops);
    } catch (error) {
        console.log(error);
        respond(res, errorHandler('500',req));
    }
};
