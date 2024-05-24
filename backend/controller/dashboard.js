const pool = require("../db")

exports.summaryCounts = async (req,res) => {
    try {
        const response = await pool.query("SELECT * FROM SummaryCounts");
        res.json(response.rows);
    } catch (error) {
        console.log(error);
    }    
}
