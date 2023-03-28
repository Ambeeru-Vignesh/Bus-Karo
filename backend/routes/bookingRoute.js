const express = require("express");
const router = express.Router();

const {
  createBooking,
  bookingPayment,
} = require("../controllers/bookingsController");
const { protect } = require("../middlewares/authMiddleware");

router.route("/book-seat").post(protect, createBooking);
router.route("/make-payments").post(protect, bookingPayment);

module.exports = router;
