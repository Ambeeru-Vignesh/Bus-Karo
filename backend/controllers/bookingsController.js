import asyncHandler from "express-async-handler";
import Booking from "../models/bookingModel.js";
import Bus from "../models/busModel.js";

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
    throw new Error("Booking failed");
  }
});

export default createBooking;
