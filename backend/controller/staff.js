const pool = require("../db")


exports.viewAllStaff = async (req,res) => {
    try {
        const staff = await pool.query("SELECT * FROM staff")
        res.json(staff.rows)
    } catch (err) {
        console.log(err)
    }
}
