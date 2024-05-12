const pool = require("../db");

exports.viewAllStaff = async (req, res) => {
  try {
    const staff = await pool.query("SELECT * FROM staff");
    res.json(staff.rows);
  } catch (err) {
    console.log(err);
  }
};

exports.viewStaffById = async (req, res) => {
  try {
    let id = req.params.id;
    const staff = await pool.query("SELECT * FROM staff WHERE staffid = $1", [
      id,
    ]);
    res.json(staff.rows);
  } catch (err) {
    console.log(err);
  }
};

exports.createStaff = async (req, res) => {
  const { staffid, firstname, lastname, contact, email, dob, salary, role } =
    req.body;
  const query = `
        INSERT INTO Staff (staffID, firstName, lastName, contact, email, DOB, salary, role)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;
  try {
    const result = await pool.query(query, [
      staffid,
      firstname,
      lastname,
      contact,
      email,
      dob,
      salary,
      role,
    ]);
    res.status(201).send("Staff member added successfully");
  } catch (error) {
    console.error("Error inserting data:", error);
    if (error.code === "23505") {
      if (error.constraint === "staff_pkey") {
        return res
          .status(409)
          .send("A staff member with the same Staff id already exists.");
      } else if (error.constraint === "staff_email_key") {
        return res
          .status(409)
          .send("A staff member with the same email already exists.");
      }
    }
    res.status(500).send("Failed to add staff member");
  }
};

exports.deleteStaff = async (req, res) => {
  try {
    const staffid = req.params.id;
    const deleteStaff = await pool.query("DELETE FROM staff WHERE staffid = $1", [
      staffid,
    ]);
    res.status(200).send("Staff member deleted Successfully")
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Error deleting staff member'})
  }
};

exports.updateStaff = async (req, res) => {
  try {
      const { staffid } = req.params;
      const { firstName, lastName, contact, email, DOB, salary, role } = req.body;

      // Check if the staff ID exists
      console.log(staffid)
      const existingStaff = await pool.query('SELECT * FROM Staff WHERE staffID = $1', [staffid]);
      if (existingStaff.rows.length === 0) {
          return res.status(404).json({ message: "Staff member not found." });
      }

      const query = `
          UPDATE Staff
          SET firstName = $1, lastName = $2, contact = $3, email = $4, DOB = $5, salary = $6, role = $7
          WHERE staffID = $8
          RETURNING *
      `;
      const values = [firstName, lastName, contact, email, DOB, salary, role, staffid];
      const result = await pool.query(query, values);

      res.status(200).json({ message: "Staff member updated successfully.", staff: result.rows[0] });
  } catch (error) {
      console.error("Error updating staff member:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
};