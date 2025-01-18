const express = require("express");
const {
  getAllMetodePengiriman,
  getMetodePengirimanById,
  createMetodePengiriman,
  updateMetodePengiriman,
  deleteMetodePengiriman,
} = require("../controllers/metodepengirimanController");
const { auth, adminAuth } = require("../middleware/auth");

const router = express.Router();

// Routes for admin only
router.get("/", auth, adminAuth, getAllMetodePengiriman); // Admin can get all metode pengiriman
router.post("/", auth, adminAuth, createMetodePengiriman); // Admin can create a new metode pengiriman
router.put("/:id", auth, adminAuth, updateMetodePengiriman); // Admin can update metode pengiriman by ID
router.delete("/:id", auth, adminAuth, deleteMetodePengiriman); // Admin can delete metode pengiriman by ID

// Routes for both admin and customers
router.get("/:id", auth, getMetodePengirimanById); // Both admin and customers can get metode pengiriman by ID

module.exports = router;
