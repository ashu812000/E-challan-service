const {createShop, getAllShops} = require('../helper/shops');

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
        const shops = await getAllShops(req);
        if (!shops) {
            return res.status(404).json({ message: 'Shop not found' });
        }
        res.status(200).json(shops);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch shop records', details: error.message});
    }
};
