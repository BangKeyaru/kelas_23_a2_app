const express = require("express");
const router = express.Router();
const { auth, adminAuth } = require("../middleware/auth");
const kategoriController = require("../controllers/kategoriController");

// Rute untuk pelanggan dan admin
router.get("/", kategoriController.getAllKategori); // Hapus middleware auth
router.get("/:id", kategoriController.getKategoriById); // Hapus middleware auth

// Rute untuk admin saja
router.post("/", auth, adminAuth, kategoriController.createKategori);
router.put("/:id", auth, adminAuth, kategoriController.updateKategori);
router.delete("/:id", auth, adminAuth, kategoriController.deleteKategori);

module.exports = router;