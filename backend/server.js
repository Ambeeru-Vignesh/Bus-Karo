const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/db");
app.use(express.json());
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const busRoutes = require("./routes/busRoutes");
const bookingRoutes = require("./routes/bookingRoute");

connectDB();
app.use("/api/users", userRoutes);
app.use("/api/buses", busRoutes);
app.use("/api/bookings", bookingRoutes);

if (process.env.NODE_ENV == "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is Running....");
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("App is running....");
});
