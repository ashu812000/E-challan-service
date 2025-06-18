const EChallan = require('../models/e-chalan');

const uploadNewChalanRequest = async (data) => {
    const {
        scheme,
        financialYear,
        month,
        shopNumber,
        productName,
        quantity,
        rate,
        calculatedRate,
        phoneNumber,
        image
    } = data;

    const newChallan = new EChallan({
        scheme,
        financialYear,
        month,
        shopNumber,
        productName,
        quantity,
        rate,
        calculatedRate,
        phoneNumber,
        image,
    });

    return await newChallan.save();
}

module.exports = {
    uploadNewChalanRequest
}
