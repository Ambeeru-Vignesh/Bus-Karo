import express from "express";
const router = express.Router();

import createBooking from "../controllers/bookingsController.js";
import protect from "../middlewares/authMiddleware.js";

router.route("/book-seat").post(protect, createBooking);

export default router;
