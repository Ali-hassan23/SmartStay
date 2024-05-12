const express = require("express");
const router = express.Router();
const pool = require("../db");
const { viewAllReservations, makeReservation } = require("../controller/reservations");

router.get("/",viewAllReservations);
router.post("/makeReservation",makeReservation);

module.exports = router;
