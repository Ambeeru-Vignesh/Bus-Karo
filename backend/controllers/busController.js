import asyncHandler from "express-async-handler";
import Bus from "../models/busModel.js";

const createBus = asyncHandler(async (req, res) => {
  const existingBus = await Bus.findOne({ number: req.body.number });
  if (existingBus) {
    res.status(400);
    throw new Error("Bus already exists");
  }

  const newBus = new Bus(req.body);
  const CreatedBus = await newBus.save();
  res.status(201).json(CreatedBus);
});

const getBuses = asyncHandler(async (req, res) => {
  const pageSize = 4;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Bus.countDocuments({});
  const buses = await Bus.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  if (!buses) {
    console.log("No buses Found");
  }

  res.json({ buses, page, pages: Math.ceil(count / pageSize) });
});

const getBusById = asyncHandler(async (req, res) => {
  const bus = await Bus.findById(req.params.id);

  if (bus) {
    res.json(bus);
  } else {
    res.status(404);
    throw new Error("Bus not found");
  }
});

const deleteBus = asyncHandler(async (req, res) => {
  try {
    await Bus.findByIdAndDelete(req.params.id);

    return res.status(200).send({
      message: "Bus deleted successfully",
    });
  } catch (error) {
    res.status(404);
    throw new Error(error.message);
  }
});

const updateBus = asyncHandler(async (req, res) => {
  try {
    const updatedBus = await Bus.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });
    res.status(200).json(updatedBus);
  } catch (error) {
    res.status(404);
    throw new Error(error.message);
  }
});

export { createBus, getBuses, getBusById, deleteBus, updateBus };
