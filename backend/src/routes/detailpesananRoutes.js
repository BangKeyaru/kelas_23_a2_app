// src/routes/detailpesananRoutes.js

const express = require("express");
const { auth, adminAuth } = require("../middleware/auth");
const {
  getAllDetailPesanan,
  getDetailPesananById,
  createDetailPesanan,
  updateDetailPesanan,
  deleteDetailPesanan,
} = require("../controllers/detailpesananController");

const router = express.Router();

// Admin-only routes
router.get("/", auth, adminAuth, getAllDetailPesanan); // Admin can view all detail pesanan

// Authenticated customer routes
router.get("/:id", auth, getDetailPesananById); // Customer can view their own detail pesanan
router.post("/", auth, createDetailPesanan); // Customer can create detail pesanan
router.put("/:id", auth, updateDetailPesanan); // Customer can update their own detail pesanan
router.delete("/:id", auth, deleteDetailPesanan); // Customer can delete their own detail pesanan

module.exports = router;