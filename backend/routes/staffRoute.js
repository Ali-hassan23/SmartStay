const express = require("express");
const router = express.Router();
const pool = require("../db");
const { viewAllStaff, viewStaffById, createStaff, deleteStaff, updateStaff } = require("../controller/staff");
const { authenticateAdminToken } = require("../middleware/adminAuthMiddleware");

router.get("/",authenticateAdminToken,viewAllStaff);
router.get("/:id",authenticateAdminToken,viewStaffById);
router.post("/",authenticateAdminToken,createStaff);
router.delete('/:id',authenticateAdminToken,deleteStaff);
router.put("/:id",authenticateAdminToken,updateStaff);

module.exports = router;
