const express = require("express");
const router = express.Router();
const pool = require("../db");
const { getAllRooms, getAllRoomsOfOneCategory, getFirstRoomAvailableOfCategory } = require("../controller/room");

router.get("/",getAllRooms);
// router.get("/:id",getAllRoomsOfOneCategory);
router.get("/:id",getFirstRoomAvailableOfCategory);

module.exports = router;
