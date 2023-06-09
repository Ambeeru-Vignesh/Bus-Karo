const express = require("express");
const router = express.Router();
const {
  createBus,
  getBuses,
  getBusById,
  deleteBus,
  updateBus,
} = require("../controllers/busController");
const { protect } = require("../middlewares/authMiddleware");

router.route("/").post(protect, createBus);
router.route("/getbuses").post(protect, getBuses);
router.route("/:id").get(protect, getBusById).delete(protect, deleteBus);
router.route("/update").put(protect, updateBus);

module.exports = router;
