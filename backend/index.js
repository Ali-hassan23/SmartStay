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

const cusAuth = require("./routes/cusAuthRoute");
app.use("/auth",cusAuth);

const admminAuth = require("./routes/adminAuthRoute");
app.use("/admin",admminAuth);

const contactUs = require("./routes/contactRoute");
app.use("/contact",contactUs);

const roomTypes = require("./routes/roomTypeRoutes");
app.use("/roomType",roomTypes);


app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});
