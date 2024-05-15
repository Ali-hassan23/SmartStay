const pool = require("../db")

exports.getAllRoomTypes = async (req,res) => {
    try {
        const rooms = await pool.query("SELECT * FROM RoomType;")
        res.json(rooms.rows)
    } catch (err) {
        console.log(err)
    }
}
