import express from "express";
const router = express.Router();
import {
  createBus,
  getBuses,
  getBusById,
  deleteBus,
  updateBus,
} from "../controllers/busController.js";
import protect from "../middlewares/authMiddleware.js";

router.route("/").get(protect, getBuses).post(protect, createBus);
router.route("/:id").get(protect, getBusById).delete(protect, deleteBus);
router.route("/update").put(protect, updateBus);

export default router;
