const express = require("express");
const router = express.Router();
const pool = require("../db");
const { getAllRoomTypes } = require("../controller/roomType");

router.get("/",getAllRoomTypes);

module.exports = router;

