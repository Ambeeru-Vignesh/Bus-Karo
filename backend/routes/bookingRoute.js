import express from "express";
const router = express.Router();

import {
  createBooking,
  bookingPayment,
} from "../controllers/bookingsController.js";
import protect from "../middlewares/authMiddleware.js";

router.route("/book-seat").post(protect, createBooking);
router.route("/make-payment").post(protect, bookingPayment);

export default router;
