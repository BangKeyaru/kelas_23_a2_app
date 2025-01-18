const express = require("express");
const router = express.Router();
const { auth, adminAuth } = require("../middleware/auth");
const {
  getAllAlamat,
  getAlamatById,
  createAlamat,
  updateAlamat,
  deleteAlamat,
} = require("../controllers/alamatpelangganController");

// Rute untuk admin
router.get("/", auth, adminAuth, getAllAlamat); // Admin dapat melihat semua alamat pelanggan

// Rute untuk pelanggan
router.get("/:id", auth, getAlamatById); // Pelanggan hanya dapat melihat alamat mereka sendiri
router.post("/", auth, createAlamat); // Pelanggan dapat menambahkan alamat mereka sendiri
router.put("/:id", auth, updateAlamat); // Pelanggan dapat mengedit alamat mereka sendiri
router.delete("/:id", auth, deleteAlamat); // Pelanggan dapat menghapus alamat mereka sendiri

module.exports = router;
