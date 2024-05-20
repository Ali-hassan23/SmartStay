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
        let category = req.params.id
        console.log(category)
        const rooms = await pool.query("SELECT * FROM room WHERE roomtypeid = $1",[category])
        res.json(rooms.rows)
    } catch (err) {
        console.log(err)
    }
}


//New function for getting the first available room of type 
exports.getFirstRoomAvailableOfCategory = async (req,res) => {
    try {
        let category = req.params.id
        const rooms = await pool.query("SELECT roomno FROM room WHERE roomtypeid = $1 AND availability = true LIMIT 1",[category])
        res.json(rooms.rows)
    } catch (error) {
        console.log(error);
    }
}
