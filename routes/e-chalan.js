let express = require('express');
let router = express.Router();
let controller = require('../controller/e-chalan');

router.post('/e-chalan', controller.uploadNewRequest);

module.exports = router;
