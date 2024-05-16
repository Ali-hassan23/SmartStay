const pool = require("../db")


exports.getAllRooms = async (req,res) => {
    try {
        const rooms = await pool.query("SELECT * FROM roomtype")
        res.json(rooms.rows)
    } catch (err) {
        console.log(err)
    }
}

exports.getAllRoomsOfOneCategory = async (req,res) => {
    try {
        let category = req.params.category
        const rooms = await pool.query("SELECT * FROM AvailableRoomsOfType WHERE typeName = $1",[category])
        res.json(rooms.rows)
    } catch (err) {
        console.log(err)
    }
}
