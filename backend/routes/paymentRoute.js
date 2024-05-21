const express = require("express");
const router = express.Router();
const pool = require("../db");
const { makePayment, viewAllPayments } = require("../controller/payment");

router.post('/',makePayment);
router.get("/",viewAllPayments)

module.exports = router;

