const express = require("express");
const router = express.Router();
const pool = require("../db");
const { getAllRooms, getAllRoomsOfOneCategory } = require("../controller/room");

router.get("/",getAllRooms);
router.get("/:category",getAllRoomsOfOneCategory);

module.exports = router;