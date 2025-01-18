const express = require("express");
const {
  getAllMetodePembayaran,
  getMetodePembayaranById,
  createMetodePembayaran,
  updateMetodePembayaran,
  deleteMetodePembayaran,
} = require("../controllers/metodepembayaranController");
const { auth, adminAuth } = require("../middleware/auth");

const router = express.Router();

// Routes for admin only
router.get("/", auth, adminAuth, getAllMetodePembayaran); // Admin can get all metode pembayaran
router.post("/", auth, adminAuth, createMetodePembayaran); // Admin can create new metode pembayaran
router.put("/:id", auth, adminAuth, updateMetodePembayaran); // Admin can update metode pembayaran
router.delete("/:id", auth, adminAuth, deleteMetodePembayaran); // Admin can delete metode pembayaran

// Routes for both admin and customers
router.get("/:id", auth, getMetodePembayaranById); // Both can get a specific metode pembayaran by ID

module.exports = router;