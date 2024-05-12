const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../db');

// Admin login controller
exports.login = async (req, res) => {
    const { username, password } = req.body;
    // console.log(username,password)
    try {
        // Query the database for the username
        const result = await pool.query('SELECT * FROM admin WHERE username = $1', [username]);
        const admin = result.rows[0];

        // Check if user exists
        if (!admin) {
            // Logging the invalid username attempt (optional)
            console.error(`Login failed: Username not found - ${username}`);
            return res.status(400).send('Invalid username or password.');
        }

        // Verify the password
        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) {
            // Logging the invalid password attempt (optional)
            console.error(`Login failed: Incorrect password for username - ${username}`);
            return res.status(400).send('Invalid username or password.');
        }

        // Generate JWT token with admin ID and role in the payload
        const accessToken = jwt.sign({ id: admin.adminID, role: admin.role }, process.env.ACCESS_TOKEN_SECRET);
        
        // Successful login
        res.json({ accessToken });
    } catch (error) {
        console.error('Error during admin login:', error);
        res.status(500).send('Internal Server Error');
    }
};


// Test function to display contents of admin table
exports.displayAdmins = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM admin');
        const admins = result.rows;
        res.json(admins);
    } catch (error) {
        console.error('Error retrieving admins:', error);
        res.status(500).send('Internal Server Error');
    }
};
