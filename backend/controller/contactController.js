const pool = require("../db");

exports.addContactQuery = async (req, res) => {
  try {
    const { name, email, phoneno, message } = req.body;
    const result = await pool.query(
      "INSERT INTO contactUs (name , email, phoneno,message) VALUES ($1,$2,$3,$4)",
      [name, email, phoneno, message]
    );
    res.status(200).json("Query Added Successfully");
  } catch (error) {
    console.log(error);
  }
};
