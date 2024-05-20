const express = require("express");
const router = express.Router();
const pool = require("../db");
const { viewAllReservations, makeReservation, getReservationById } = require("../controller/reservations");
const { authenticateToken } = require("../middleware/customerAuthenticationMiddleware");

router.get("/", authenticateToken,viewAllReservations);
router.get("/:id",getReservationById);
router.post("/makeReservation",makeReservation);

module.exports = router;
