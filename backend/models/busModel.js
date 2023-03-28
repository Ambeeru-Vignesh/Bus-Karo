const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  journeyDate: {
    type: String,
    required: false,
  },
  departure: {
    type: String,
    required: false,
  },
  arrival: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  fare: {
    type: Number,
    required: true,
  },
  seatsBooked: {
    type: Array,
    default: [],
  },
  status: {
    type: String,
    default: "Yet To Start",
  },
});

const Bus = mongoose.model("buses", busSchema);
module.exports = Bus;
