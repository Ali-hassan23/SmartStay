const express = require("express");
const router = express.Router();
const pool = require("../db");
const { viewAllStaff } = require("../controller/staff");

router.get("/",viewAllStaff);

module.exports = router;
