const express = require("express");
const router = express.Router();
const pool = require("../db");
const { addContactQuery, getUnasweredQueries, updateReadQuery } = require("../controller/contactController");

router.post('/',addContactQuery);
router.get('/',getUnasweredQueries);
router.put('/:id',updateReadQuery);

module.exports = router;

