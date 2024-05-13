const express = require("express");
const router = express.Router();
const pool = require("../db");
const { addContactQuery } = require("../controller/contactController");

router.post('/',addContactQuery);

module.exports = router;

