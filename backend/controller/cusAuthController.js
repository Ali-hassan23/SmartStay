const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../db');

// Login controller
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM customer WHERE email = $1', [email]);
        const customer = result.rows[0];
        if (!customer) return res.status(400).send('Invalid email or password.');

        const validPassword = await bcrypt.compare(password, customer.password);
        if (!validPassword) return res.status(400).send('Invalid email or password.');

        // Generate JWT token with customer ID in the payload
        const accessToken = jwt.sign({ id: customer.customerid }, process.env.ACCESS_TOKEN_SECRET);
        res.json({ accessToken });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Check for duplicate email controller
exports.checkDuplicateEmail = async (req, res) => {
    const { email } = req.body;

    try {
        const result = await pool.query('SELECT * FROM customer WHERE email = $1', [email]);
        const existingCustomer = result.rows[0];
        if (existingCustomer) return res.status(400).send('Email already exists.');

        res.status(200).send('Email available.');
    } catch (error) {
        console.error('Error checking duplicate email:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Sign up controller
exports.signup = async (req, res) => {
    const { firstname, lastname, email, dob, password, address, phone } = req.body;

    const customerid = generateRandomCustomerId();
    const query = `
        INSERT INTO customer (customerid, firstname, lastname, email, dob, password, address, phone)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;
    try {
        await pool.query(query, [customerid, firstname, lastname, email,dob, password, address, phone]);
        res.status(201).send("Customer signed up successfully.");
    } catch (error) {
        console.error("Error inserting data:", error);
        if (error.code === "23505") {
            if (error.constraint === "customer_email_key") {
                return res.status(409).send("A customer with the same email already exists.");
            }
        }
        res.status(500).send("Failed to add customer.");
    }
};

// Function to generate customer ID
function generateRandomCustomerId() {
    const characters = '0123456789';
    let customerId = 'C';
    for (let i = 0; i < 5; i++) {
        customerId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return customerId;
}
