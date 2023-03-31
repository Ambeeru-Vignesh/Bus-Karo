const express = require("express");
const router = express.Router();

const {
  createBooking,
  bookingPayment,
  getBookingsById,
  getAllBookings,
} = require("../controllers/bookingsController");
const { protect } = require("../middlewares/authMiddleware");

router.route("/book-seat").post(protect, createBooking);
router.route("/make-payments").post(protect, bookingPayment);
router.route("/myBookings").get(protect, getBookingsById);
router.route("/bookings").get(protect, getAllBookings);

module.exports = router;
