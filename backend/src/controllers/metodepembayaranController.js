const MetodePembayaran = require("../models/MetodePembayaran");

// Get all Metode Pembayaran
exports.getAllMetodePembayaran = async (req, res) => {
  try {
    const metodePembayaran = await MetodePembayaran.findAll();
    res.status(200).json(metodePembayaran);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Metode Pembayaran by ID
exports.getMetodePembayaranById = async (req, res) => {
  try {
    const { id } = req.params;
    const metodePembayaran = await MetodePembayaran.findByPk(id);

    if (!metodePembayaran) {
      return res.status(404).json({ message: "Metode Pembayaran not found" });
    }

    res.status(200).json(metodePembayaran);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create Metode Pembayaran
exports.createMetodePembayaran = async (req, res) => {
  try {
    const { nama_metode, deskripsi } = req.body;
    const metodePembayaran = await MetodePembayaran.create({ nama_metode, deskripsi });
    res.status(201).json(metodePembayaran);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Metode Pembayaran
exports.updateMetodePembayaran = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_metode, deskripsi } = req.body;

    const metodePembayaran = await MetodePembayaran.findByPk(id);

    if (!metodePembayaran) {
      return res.status(404).json({ message: "Metode Pembayaran not found" });
    }

    metodePembayaran.nama_metode = nama_metode;
    metodePembayaran.deskripsi = deskripsi;
    await metodePembayaran.save();

    res.status(200).json(metodePembayaran);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Metode Pembayaran
exports.deleteMetodePembayaran = async (req, res) => {
  try {
    const { id } = req.params;

    const metodePembayaran = await MetodePembayaran.findByPk(id);

    if (!metodePembayaran) {
      return res.status(404).json({ message: "Metode Pembayaran not found" });
    }

    await metodePembayaran.destroy();

    res.status(200).json({ message: "Metode Pembayaran deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};