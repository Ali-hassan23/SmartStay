const express = require("express");
const router = express.Router();
const pool = require("../db");
const { viewAllStaff, createStaff, updateStaff, deleteStaff } = require("../controller/staff");

router.get("/",viewAllStaff);
router.post("/addStaff",createStaff);
router.put("/update/:staffid",updateStaff)
router.delete("/delete/:staffid",deleteStaff)

module.exports = router;
