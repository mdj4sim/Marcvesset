const express = require("express");
const router = express.Router();

const {
    capturePayment,
    verifyPayment,
    sendPaymentSuccessEmail
} = require("../controllers/Payment");

const {auth , isAdmin , isUser} = require("../middlewares/auth");
router.post("/captureTicketsPayment" , auth , isUser , capturePayment);
router.post("/verifyTicketsSignature" , verifyPayment);
router.post("/paymentMail" , sendPaymentSuccessEmail);

module.exports = router;