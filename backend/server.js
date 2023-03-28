const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/db");
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const busRoutes = require("./routes/busRoutes");
const bookingRoutes = require("./routes/bookingRoute");

connectDB();
app.use("/api/users", userRoutes);
app.use("/api/buses", busRoutes);
app.use("/api/bookings", bookingRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("App is running....");
});
