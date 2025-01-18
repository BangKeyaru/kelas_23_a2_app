const express = require("express");
const { auth, adminAuth } = require("../middleware/auth");
const UserController = require("../controllers/userController");

const router = express.Router();

// Public routes
router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);

// Protected routes
router.get("/profile", auth, UserController.getUserById);
router.put("/profile", auth, UserController.updateUserProfile);

// Admin routes
router.get("/", auth, adminAuth, UserController.getAllUsers);
router.get("/:id", auth, adminAuth, UserController.getUserById);
router.put("/:id", auth, adminAuth, UserController.updateUserProfileById); // Pastikan rute ini benar

module.exports = router;