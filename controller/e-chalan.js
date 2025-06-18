const User = require('../models/e-chalan');
const { formatUserResponse } = require('../helper/e-chalan');
const {uploadNewChalanRequest} = require("../helper/e-chalan");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        const formatted = users.map(formatUserResponse);
        res.json(formatted);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

const uploadNewRequest = async (req, res) => {
    try {
        const savedChallan = await uploadNewChalanRequest(req.body);
        res.status(201).json({
            message: 'Challan created successfully.',
            data: savedChallan,
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { getAllUsers, uploadNewRequest };
