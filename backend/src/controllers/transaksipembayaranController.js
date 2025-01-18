const TransaksiPembayaran = require("../models/TransaksiPembayaran");
const Pesanan = require("../models/Pesanan");
const MetodePembayaran = require("../models/MetodePembayaran");

// Get all transaksi pembayaran
exports.getAllTransaksiPembayaran = async (req, res) => {
  try {
    const transaksi = await TransaksiPembayaran.findAll({
      include: [
        { model: Pesanan, as: "pesanan" },
        { model: MetodePembayaran, as: "metodePembayaran" },
      ],
    });
    res.status(200).json(transaksi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get transaksi pembayaran by ID
exports.getTransaksiPembayaranById = async (req, res) => {
  const { id } = req.params;
  try {
    const transaksi = await TransaksiPembayaran.findByPk(id, {
      include: [
        { model: Pesanan, as: "pesanan" },
        { model: MetodePembayaran, as: "metodePembayaran" },
      ],
    });
    if (!transaksi) {
      return res.status(404).json({ error: "Transaksi pembayaran tidak ditemukan" });
    }
    res.status(200).json(transaksi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create transaksi pembayaran
exports.createTransaksiPembayaran = async (req, res) => {
  const { id_pesanan, id_metode_pembayaran, jumlah_bayar, status_pembayaran } = req.body;
  try {
    const transaksi = await TransaksiPembayaran.create({
      id_pesanan,
      id_metode_pembayaran,
      jumlah_bayar,
      status_pembayaran,
    });
    res.status(201).json(transaksi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update transaksi pembayaran by ID
exports.updateTransaksiPembayaran = async (req, res) => {
  const { id } = req.params;
  const { id_pesanan, id_metode_pembayaran, jumlah_bayar, status_pembayaran } = req.body;
  try {
    const transaksi = await TransaksiPembayaran.findByPk(id);
    if (!transaksi) {
      return res.status(404).json({ error: "Transaksi pembayaran tidak ditemukan" });
    }
    await transaksi.update({ id_pesanan, id_metode_pembayaran, jumlah_bayar, status_pembayaran });
    res.status(200).json(transaksi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete transaksi pembayaran by ID
exports.deleteTransaksiPembayaran = async (req, res) => {
  const { id } = req.params;
  try {
    const transaksi = await TransaksiPembayaran.findByPk(id);
    if (!transaksi) {
      return res.status(404).json({ error: "Transaksi pembayaran tidak ditemukan" });
    }
    await transaksi.destroy();
    res.status(200).json({ message: "Transaksi pembayaran berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
