const express = require('express');
const router = express.Router();
const  pool  = require('../db');
const adminAuthController = require('../controller/adminAuthController'); 
const { authenticateAdminToken } = require('../middleware/adminAuthMiddleware');

router.post('/login', adminAuthController.login);

// Test function
router.get('/login', (req, res) => {
    res.json("Hurray");
});

router.get('/displayAdmins', authenticateAdminToken, adminAuthController.displayAdmins);



module.exports = router;
