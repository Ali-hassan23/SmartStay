const express = require("express");
const router = express.Router();
const pool = require("../db");
const { viewAllStaff, viewStaffById, createStaff, deleteStaff, updateStaff } = require("../controller/staff");

router.get("/",viewAllStaff);
router.get("/:id",viewStaffById);
router.post("/",createStaff);
router.delete('/:id',deleteStaff);
router.put("/:id",updateStaff);

module.exports = router;
