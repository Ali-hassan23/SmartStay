const pool = require("../db")

exports.getAllRoomTypes = async (req,res) => {
    try {
        const rooms = await pool.query("SELECT * FROM RoomType;")
        res.json(rooms.rows)
    } catch (err) {
        console.log(err)
    }
}

exports.getSingleRoomType = async (req,res) => {
    let id = req.params.id;
    try {
        const rooms = await pool.query("SELECT * FROM RoomType WHERE roomtypeid = $1",[id])
        res.json(rooms.rows)
    } catch (err) {
        console.log(err)
    }
}
