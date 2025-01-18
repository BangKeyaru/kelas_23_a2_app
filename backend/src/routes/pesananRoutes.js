const express = require("express");
const router = express.Router();
const pesananController = require("../controllers/pesananController");
const { auth, adminAuth } = require("../middleware/auth");

// Routes for customers (authenticated users)
router.post("/", auth, pesananController.createPesanan); // Pelanggan dapat membuat pesanan
router.get("/:id", auth, pesananController.getPesananById); // Pelanggan dapat melihat detail pesanan mereka sendiri

// Routes for admin
router.get("/", auth, adminAuth, pesananController.getAllPesanan); // Admin dapat melihat semua pesanan
router.put("/:id", auth, adminAuth, pesananController.updatePesanan); // Admin dapat memperbarui pesanan
router.delete("/:id", auth, adminAuth, pesananController.deletePesanan); // Admin dapat menghapus pesanan

module.exports = router;