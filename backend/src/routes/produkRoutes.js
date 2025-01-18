const express = require("express");
const multer = require("multer");
const path = require("path");
const produkController = require("../controllers/produkController"); // Pastikan path sesuai
const { auth, adminAuth } = require("../middleware/auth"); // Middleware autentikasi
const router = express.Router();

// Konfigurasi Multer untuk upload gambar
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Get All Produk
router.get("/", produkController.getAllProduk);
router.get("/:id", produkController.getAllProduk);

// Add New Produk (Admin Only)
router.post("/", auth, adminAuth, upload.single("gambar"), produkController.createProduk);

// Update Produk (Admin Only)
router.put("/:id", auth, adminAuth, upload.single("gambar"), produkController.updateProduk);

// Delete Produk (Admin Only)
router.delete("/:id", auth, adminAuth, produkController.deleteProduk);

module.exports = router;