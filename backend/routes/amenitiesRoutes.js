const express = require("express");
const router = express.Router();
const pool = require("../db");
const { getAmenities } = require("../controller/amenities");

router.get("/",getAmenities);

module.exports = router;
