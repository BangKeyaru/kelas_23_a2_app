const Produk = require("../models/Produk");
const Kategori = require("../models/Kategori");
const { Op } = require("sequelize");
const multer = require("multer");
const path = require("path");

// Konfigurasi Multer untuk Upload Gambar
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Controller untuk Produk
module.exports = {
  // Menambahkan Produk Baru
  createProduk: async (req, res) => {
    const { id_kategori, nama_produk, deskripsi, harga, stok } = req.body;
    const gambar = req.file ? req.file.filename : null;

    try {
      const kategori = await Kategori.findByPk(id_kategori);
      if (!kategori) {
        return res.status(404).json({ message: "Kategori tidak ditemukan." });
      }

      const produk = await Produk.create({
        id_kategori,
        nama_produk,
        deskripsi,
        harga,
        stok,
        gambar,
      });
      res.status(201).json(produk);
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan server.", error: error.message });
    }
  },

  // Mendapatkan Semua Produk
  getAllProduk: async (req, res) => {
    try {
      const produk = await Produk.findAll({
        include: [
          {
            model: Kategori,
            as: "kategori",
          },
        ],
      });
      res.status(200).json(produk);
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan server.", error: error.message });
    }
  },

  // Mendapatkan Produk Berdasarkan ID
  getProdukById: async (req, res) => {
    const { id } = req.params;

    try {
      const produk = await Produk.findByPk(id, {
        include: [
          {
            model: Kategori,
            as: "kategori",
          },
        ],
      });

      if (!produk) {
        return res.status(404).json({ message: "Produk tidak ditemukan." });
      }
      res.status(200).json(produk);
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan server.", error: error.message });
    }
  },

  // Memperbarui Produk Berdasarkan ID
  updateProduk: async (req, res) => {
    const { id } = req.params;
    const { id_kategori, nama_produk, deskripsi, harga, stok } = req.body;
    const gambar = req.file ? req.file.filename : null;

    try {
      const produk = await Produk.findByPk(id);

      if (!produk) {
        return res.status(404).json({ message: "Produk tidak ditemukan." });
      }

      if (id_kategori) {
        const kategori = await Kategori.findByPk(id_kategori);
        if (!kategori) {
          return res.status(404).json({ message: "Kategori tidak ditemukan." });
        }
        produk.id_kategori = id_kategori;
      }

      produk.nama_produk = nama_produk || produk.nama_produk;
      produk.deskripsi = deskripsi || produk.deskripsi;
      produk.harga = harga || produk.harga;
      produk.stok = stok || produk.stok;
      if (gambar) {
        produk.gambar = gambar;
      }

      await produk.save();
      res.status(200).json(produk);
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan server.", error: error.message });
    }
  },

  // Menghapus Produk Berdasarkan ID
  deleteProduk: async (req, res) => {
    const { id } = req.params;

    try {
      const produk = await Produk.findByPk(id);

      if (!produk) {
        return res.status(404).json({ message: "Produk tidak ditemukan." });
      }

      await produk.destroy();
      res.status(200).json({ message: "Produk berhasil dihapus." });
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan server.", error: error.message });
    }
  },

  upload,
};