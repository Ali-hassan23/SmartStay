const pool = require("../db")


exports.getAllRooms = async (req,res) => {
    try {
        const rooms = await pool.query("SELECT DISTINCT roomtype, capacity, price_per_night FROM room")
        res.json(rooms.rows)
    } catch (err) {
        console.log(err)
    }
}

exports.getAllRoomsOfOneCategory = async (req,res) => {
    try {
        let category = req.params.category
        const rooms = await pool.query("SELECT * FROM room where roomtype = $1",[category])
        res.json(rooms.rows)
    } catch (err) {
        console.log(err)
    }
}
