const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../db");

// Login controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM customer WHERE email = $1", [
      email,
    ]);
    const customer = result.rows[0];
    if (!customer) return res.status(400).send("Invalid email or password.");

    const validPassword = await bcrypt.compare(password, customer.password);
    if (!validPassword)
      return res.status(400).send("Invalid email or password.");

    // Generate JWT token with customer ID in the payload
    const accessToken = jwt.sign(
      { id: customer.customerid },
      process.env.ACCESS_CUSTOMER_TOKEN_SECRET  //Token name changed
    );
    res.json({ accessToken });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.signup = async (req, res) => {
  const { firstname, lastname, phone, email, dob, address, password } =
    req.body;
  const query = `
    INSERT INTO Customer (customerid, firstname, lastname, phone, email, dob, address, password)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
  const customerid = generateCustomerID();
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(query, [
      customerid,
      firstname,
      lastname,
      phone,
      email,
      dob,
      address,
      hashedPassword,
    ]);
    res.status(201).send("Customer added successfully");
  } catch (error) {
    console.log(error);
    if (error.code === "23505") {
      if (error.constraint === "customer_email_key") {
        return res
          .status(409)
          .send("A staff member with the same email already exists.");
      }
    }
  }
};

// Check for duplicate email controller
exports.checkDuplicateEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const result = await pool.query("SELECT * FROM customer WHERE email = $1", [
      email,
    ]);
    const existingCustomer = result.rows[0];
    if (existingCustomer) return res.status(400).send("Email already exists.");

    res.status(200).send("Email available.");
  } catch (error) {
    console.error("Error checking duplicate email:", error);
    res.status(500).send("Internal Server Error");
  }
};

function generateCustomerID() {
  const randomNumber = Math.floor(10000 + Math.random() * 90000);
  return "CU" + randomNumber;
}
