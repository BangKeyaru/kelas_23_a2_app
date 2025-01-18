// src/routes/keranjangRoutes.js
const express = require("express");
const { auth } = require("../middleware/auth");
const keranjangController = require("../controllers/keranjangController");

const router = express.Router();

router.post("/", auth, keranjangController.addToCart); // Tambah ke keranjang
router.get("/", auth, keranjangController.getCart); // Dapatkan semua item di keranjang
router.put("/", auth, keranjangController.updateCart); // Update jumlah produk
router.delete("/", auth, keranjangController.removeFromCart); // Hapus item dari keranjang

module.exports = router;
