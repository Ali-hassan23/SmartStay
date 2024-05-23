const express = require("express");
const router = express.Router();
const pool = require("../db");
const { makePayment, viewAllPayments, viewPayments } = require("../controller/payment");

router.post('/',makePayment);
router.get("/",viewAllPayments);
router.get('/allPayments',viewPayments);

module.exports = router;

