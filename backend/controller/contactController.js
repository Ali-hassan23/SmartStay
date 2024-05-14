const { response } = require("express");
const pool = require("../db");

exports.addContactQuery = async (req, res) => {
  try {
    const { name, email, phoneno, message, is_read } = req.body;
    const result = await pool.query(
      "INSERT INTO contactUs (name , email, phoneno,message,is_read) VALUES ($1,$2,$3,$4,$5)",
      [name, email, phoneno, message, is_read]
    );
    res.status(200).json("Query Added Successfully");
  } catch (error) {
    console.log(error);
  }
};

exports.getUnasweredQueries = async (req, res) => {
  try {
    const queries = await pool.query(
      "SELECT * FROM contactUs WHERE is_read = $1",
      [false]
    );
    res.json(queries.rows);
  } catch (err) {
    console.log(err);
  }
};

exports.updateReadQuery = async (req, res) => {
  const id = req.params.id;
  const query = `UPDATE contactUs
    SET
      is_read = true
    WHERE
      id = $1`

  try {
    const result = await pool.query(query, [
      id,
    ]);
    res.status(200).send("Query data updated successfully");
    } catch (error) {
      res.status(201).send("Error Updating")
    console.log(error);
  }
};
