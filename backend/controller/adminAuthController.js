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
        const accessToken = jwt.sign({ id: admin.adminID, role: admin.role }, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'10s'});
        
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


//Added By Hassan
exports.verifyAdmin = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Failed to authenticate token' });
      }
  
      // Check if user is an admin
      if (decoded.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized access' });
      }
  
      req.user = decoded;
      next();
    });
  };
