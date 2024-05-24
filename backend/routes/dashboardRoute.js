const express = require("express");
const router = express.Router();
const pool = require("../db");
const { summaryCounts } = require("../controller/dashboard");

router.get('/',summaryCounts);

module.exports = router;
