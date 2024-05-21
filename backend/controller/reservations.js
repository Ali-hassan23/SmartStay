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
    const decoded = jwt.verify(token, process.env.ACCESS_CUSTOMER_TOKEN_SECRET);
    const customerId = decoded.id;

    // Query reservations for the logged-in customer
    const reservations = await pool.query(
      "SELECT * FROM ReservationWithPaymentDetails WHERE reservationID IN ( SELECT reservationID FROM Reservation WHERE customerID = $1)",
      [customerId]
    );
    res.json(reservations.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

exports.getReservationById = async (req, res) => {
  let id = req.params.id;
  try {
    const reservation = await pool.query(
      "SELECT reservationid, total_cost FROM Reservation WHERE reservationid = $1",
      [id]
    );
    res.json(reservation.rows);
  } catch (error) {
    console.log(error);
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
    const decoded = jwt.verify(token, process.env.ACCESS_CUSTOMER_TOKEN_SECRET);
    const customerId = decoded.id;

    // Extract reservation details from the request body
    const { roomNumber, checkinDate, checkoutDate, total } = req.body;

    // Generate a reservation ID (you can use any logic to generate this)
    const reservationID = generateReservationID();

    // Insert the reservation into the database
    await pool.query(
      "INSERT INTO reservation (reservationID, customerID, roomNo, checkinDate, checkoutDate, total_cost) VALUES ($1, $2, $3, $4, $5, $6)",
      [reservationID, customerId, roomNumber, checkinDate, checkoutDate, total]
    );

    // res.status(201).send("Reservation made successfully");
    res.status(201).json({ reservationID });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

exports.activeReservations = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM reservation WHERE checkoutdate > CURRENT_DATE");
    console.log(result)

    res.status(200).json(result.rows);
    // res.json("HEHEHEHEHE")
  } catch (error) {
    console.error('Error fetching active reservations:', error);
    res.status(500).json('An error occurred while fetching active reservations');
  }
};

function generateReservationID() {
  // Logic to generate a unique reservation ID
  const randomNumber = Math.floor(10000 + Math.random() * 90000);
  return "R" + randomNumber;
}
