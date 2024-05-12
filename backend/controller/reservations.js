const pool = require("../db");
const jwt = require("jsonwebtoken");

exports.viewAllReservations = async (req, res) => {
    try {
        // Check if the Authorization header exists
        if (!req.headers.authorization) {
            return res.status(401).send("Authorization header is missing");
        }

        // Get the customer ID from the JWT token
        const token = req.headers.authorization.split(" ")[1]; 
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const customerId = decoded.id;


        // Query reservations for the logged-in customer
        const reservations = await pool.query("SELECT * FROM reservation WHERE customerid = $1", [customerId]);
        res.json(reservations.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.makeReservation = async (req, res) => {
    try {
        // Check if the Authorization header exists
        if (!req.headers.authorization) {
            return res.status(401).send("Authorization header is missing");
        }

        // Get the customer ID from the JWT token
        const token = req.headers.authorization.split(" ")[1]; 
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const customerId = decoded.id;

        // Extract reservation details from the request body
        const { roomNo, checkinDate, checkoutDate, cost } = req.body;

        // Generate a reservation ID (you can use any logic to generate this)
        const reservationID = generateReservationID();

        // Insert the reservation into the database
        await pool.query(
            "INSERT INTO reservation (reservationID, customerID, roomNo, checkinDate, checkoutDate, cost) VALUES ($1, $2, $3, $4, $5, $6)",
            [reservationID, customerId, roomNo, checkinDate, checkoutDate, cost]
        );

        res.status(201).send("Reservation made successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

function generateReservationID() {
    // Logic to generate a unique reservation ID
    return "R" + Math.random().toString(36).substr(2, 5).toUpperCase();
}

