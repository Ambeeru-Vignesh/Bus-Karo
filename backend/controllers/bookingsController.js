const asyncHandler = require("express-async-handler");
const Booking = require("../models/bookingModel");
const Bus = require("../models/busModel");
const stripe = require("stripe")(process.env.stripe_key);

const createBooking = asyncHandler(async (req, res) => {
  try {
    const newBooking = new Booking({
      ...req.body,
      user: req.user._id,
    });
    await newBooking.save();
    const bus = await Bus.findById(req.body.bus);
    bus.seatsBooked = [...bus.seatsBooked, ...req.body.seats];
    await bus.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500);
    throw new Error("Booking save failed");
  }
});

const bookingPayment = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Bus Booking",
          },
          unit_amount: req.body.amount,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url:
      "http://localhost:3000/checkout-success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:3000/checkout-fail",
  });
  res.send({
    url: session.url,
    checkoutSessionId: session.id,
  });
};

const getBookingsById = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }) //user: req.user._id means logged in users
    .populate("bus")
    .populate("user");
  if (bookings) {
    res.json(bookings);
  } else {
    res.status(404);
    throw new Error("Bookings not found");
  }
});

module.exports = { createBooking, bookingPayment, getBookingsById };
