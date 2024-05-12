const pool = require("../db")


exports.viewAllReservations = async (req,res) => {
    try {
        const reservation = await pool.query("SELECT * FROM reservation")
        res.json(reservation.rows)
    } catch (err) {
        console.log(err)
    }
}
