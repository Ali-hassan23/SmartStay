const pool = require("../db")


exports.getAmenities = async (req,res) => {
    try {
        const amenities = await pool.query("SELECT * FROM Amenities")
        res.json(amenities.rows)
    } catch (err) {
        console.log(err)
    }
}
