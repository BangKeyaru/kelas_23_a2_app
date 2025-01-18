// src/controllers/keranjangController.js
const Keranjang = require("../models/Keranjang");
const Produk = require("../models/Produk");

// Tambahkan produk ke keranjang
exports.addToCart = async (req, res) => {
  const { id_produk, jumlah } = req.body;
  const id_user = req.user.id; // Dari middleware auth

  try {
    const produk = await Produk.findByPk(id_produk);
    if (!produk) {
      return res.status(404).json({ message: "Produk tidak ditemukan." });
    }

    const keranjangItem = await Keranjang.findOne({
      where: { id_user, id_produk },
    });

    if (keranjangItem) {
      keranjangItem.jumlah += jumlah;
      await keranjangItem.save();
    } else {
      await Keranjang.create({ id_user, id_produk, jumlah });
    }

    res.status(200).json({ message: "Produk berhasil ditambahkan ke keranjang." });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server.", error: error.message });
  }
};

// Mendapatkan semua item dalam keranjang
exports.getCart = async (req, res) => {
  const id_user = req.user.id; // Dari middleware auth

  try {
    const keranjang = await Keranjang.findAll({
      where: { id_user },
      include: [
        { model: Produk, as: "produk" },
      ],
    });
    res.status(200).json(keranjang);
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server.", error: error.message });
  }
};

// Mengupdate jumlah produk di keranjang
exports.updateCart = async (req, res) => {
  const { id_produk, jumlah } = req.body;
  const id_user = req.user.id;

  try {
    const keranjangItem = await Keranjang.findOne({
      where: { id_user, id_produk },
    });

    if (!keranjangItem) {
      return res.status(404).json({ message: "Item tidak ditemukan di keranjang." });
    }

    keranjangItem.jumlah = jumlah;
    await keranjangItem.save();

    res.status(200).json({ message: "Jumlah produk berhasil diperbarui." });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server.", error: error.message });
  }
};

// Menghapus item dari keranjang
exports.removeFromCart = async (req, res) => {
  const { id_produk } = req.body;
  const id_user = req.user.id;

  try {
    const keranjangItem = await Keranjang.findOne({
      where: { id_user, id_produk },
    });

    if (!keranjangItem) {
      return res.status(404).json({ message: "Item tidak ditemukan di keranjang." });
    }

    await keranjangItem.destroy();
    res.status(200).json({ message: "Item berhasil dihapus dari keranjang." });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server.", error: error.message });
  }
};
