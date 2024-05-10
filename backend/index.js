const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const PORT = 5000;

const amenitiesRoutes = require("./routes/amenitiesRoutes");
app.use("/amenities", amenitiesRoutes);


const roomRoutes = require("./routes/roomRoute");
app.use("/rooms", roomRoutes);

const reservationRoutes = require("./routes/reservationRoute");
app.use("/reservation", reservationRoutes);

const staffRoutes = require("./routes/staffRoute");
app.use("/staff", staffRoutes);


app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});
