const mongoose = require('mongoose');

const eChallanSchema = new mongoose.Schema({
    scheme: {
        type: String,
        required: true,
    },
    financialYear: {
        type: String,
        required: true,
        match: /^\d{4}-\d{2}$/, // e.g., 2025-26
    },
    month: {
        type: String,
        required: true,
    },
    shopNumber: {
        type: String,
        required: true,
        minlength: 3,
    },
    productName: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
    rate: {
        type: Number,
        default: 100,
    },
    calculatedRate: {
        type: Number,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/,
    },
    image: {
        type: String, // store image path or base64 or URL
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('E-Challan', eChallanSchema);
