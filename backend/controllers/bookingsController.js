import asyncHandler from "express-async-handler";
import Booking from "../models/bookingModel.js";
import Bus from "../models/busModel.js";
import { v4 as uuidv4 } from "uuid";
import Stripe from "stripe";
const stripe = new Stripe(process.env.stripe_key);

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
  try {
    const { token, amount } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const payment = await stripe.charges.create(
      {
        amount: amount,
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      res.status(200).send({
        message: "Payment successful",
        data: {
          transactionId: payment.source.id,
        },
        success: true,
      });
    } else {
      res.status(500).send({
        message: "Payment failed",
        data: error,
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Payment failed",
      data: error,
      success: false,
    });
  }
};

export { createBooking, bookingPayment };
