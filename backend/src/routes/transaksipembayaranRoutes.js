const express = require("express");
const router = express.Router();
const {
  getAllTransaksiPembayaran,
  getTransaksiPembayaranById,
  createTransaksiPembayaran,
  updateTransaksiPembayaran,
  deleteTransaksiPembayaran,
} = require("../controllers/transaksipembayaranController");
const { auth, adminAuth } = require("../middleware/auth");

// Routes for customers (authenticated users)
router.post("/", auth, createTransaksiPembayaran); // Pelanggan dapat membuat transaksi pembayaran
router.get("/:id", auth, getTransaksiPembayaranById); // Pelanggan dapat melihat transaksi pembayaran miliknya

// Routes for admin
router.get("/", auth, adminAuth, getAllTransaksiPembayaran); // Admin dapat melihat semua transaksi pembayaran
router.put("/:id", auth, adminAuth, updateTransaksiPembayaran); // Admin dapat memperbarui transaksi pembayaran
router.delete("/:id", auth, adminAuth, deleteTransaksiPembayaran); // Admin dapat menghapus transaksi pembayaran

module.exports = router;