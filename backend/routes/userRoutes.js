const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  getUsers,
  updateUsers,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.get("/get-all-users", protect, getUsers);
router.post("/update-user-permissions", protect, updateUsers);

module.exports = router;
