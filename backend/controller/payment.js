const pool = require("../db")

exports.makePayment = async(req,res) => {
    const { reservationid, amount, credit_card_number, card_holder_name} = req.body;
        const paymentid = generatePaymentID();
        const paymentdate = new Date();
        const query = 'INSERT INTO Payment (paymentid, reservationid, amount, paymentdate, credit_card_number, card_holder_name, ispaid) VALUES ($1, $2, $3, $4, $5, $6, $7)'
    try {
        const result = await pool.query(query,[
            paymentid,
            reservationid,
            amount,
            paymentdate,
            credit_card_number,
            card_holder_name,
            true
        ])
        res.status(201).send("Payment maded successfully");
    } catch (error) {
        console.log(error);
    }
}

exports.viewPayments = async(req,res) => {
    try {
        const response = await pool.query('SELECT * FROM Payment');
        res.json(response.rows)
    } catch (error) {
        console.log(error)
    }
}

function generatePaymentID() {
    // Logic to generate a unique reservation ID
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    return "P" + randomNumber;
  }
  
