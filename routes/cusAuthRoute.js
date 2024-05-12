// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { pool } = require('../db');
const authController = require('../controller/cusAuthController'); 

router.post('/login', authController.login);

// Test function
router.get('/login', (req, res) => {
    res.json("Hurray");
});

router.post('/checkDuplicateEmail', authController.checkDuplicateEmail);

module.exports = router;