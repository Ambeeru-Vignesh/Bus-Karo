import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import busRoutes from "./routes/busRoutes.js";
import bookingRoutes from "./routes/bookingRoute.js";

const app = express();
dotenv.config();

connectDB();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/buses", busRoutes);
app.use("/api/bookings", bookingRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("App is running....");
});
