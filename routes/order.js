const express = require("express")
const router = express.Router();
const orderController = require("../controller/orders");
const multer = require('multer');
const verifyAuth = require("../middleware/authmiddleware");
const upload = multer({storage: multer.memoryStorage()});
router.post("/", orderController.doOrder);
router.get('/',verifyAuth, orderController.fetchOrderCounts)
router.get("/allOrders",verifyAuth,orderController.getAllOrders);
router.post('/calculatePrice',orderController.calculatePrice);
router.post('/update',verifyAuth,orderController.updateOrder);
router.get("/:orderId", verifyAuth,orderController.fetchOrder);
router.post('/:orderId/payment-proof',upload.single("image"),orderController.paymentProof)
router.get('/:orderId/payment-proof',verifyAuth,orderController.getPaymentProof)

module.exports = router;