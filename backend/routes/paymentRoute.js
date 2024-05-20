const express = require("express");
const router = express.Router();
const pool = require("../db");
const { makePayment } = require("../controller/payment");

router.post('/',makePayment);

module.exports = router;

