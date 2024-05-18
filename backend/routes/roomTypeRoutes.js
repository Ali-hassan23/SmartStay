const express = require("express");
const router = express.Router();
const pool = require("../db");
const { getAllRoomTypes, getSingleRoomType } = require("../controller/roomType");

router.get("/", getAllRoomTypes);
router.get("/:id", getSingleRoomType);

module.exports = router;
