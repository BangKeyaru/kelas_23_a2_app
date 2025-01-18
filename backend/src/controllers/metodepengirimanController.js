const MetodePengiriman = require("../models/MetodePengiriman");

// Create a new Metode Pengiriman
exports.createMetodePengiriman = async (req, res) => {
  const { nama_metode, deskripsi } = req.body;

  if (!nama_metode) {
    return res.status(400).json({ message: "Nama metode pengiriman wajib diisi." });
  }

  try {
    const metodePengiriman = await MetodePengiriman.create({
      nama_metode,
      deskripsi,
    });

    res.status(201).json({
      message: "Metode pengiriman berhasil dibuat.",
      metodePengiriman,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

// Get all Metode Pengiriman
exports.getAllMetodePengiriman = async (req, res) => {
  try {
    const metodePengiriman = await MetodePengiriman.findAll();
    res.status(200).json(metodePengiriman);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

// Get Metode Pengiriman by ID
exports.getMetodePengirimanById = async (req, res) => {
  const { id } = req.params;

  try {
    const metodePengiriman = await MetodePengiriman.findByPk(id);

    if (!metodePengiriman) {
      return res.status(404).json({ message: "Metode pengiriman tidak ditemukan." });
    }

    res.status(200).json(metodePengiriman);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

// Update Metode Pengiriman by ID
exports.updateMetodePengiriman = async (req, res) => {
  const { id } = req.params;
  const { nama_metode, deskripsi } = req.body;

  try {
    const metodePengiriman = await MetodePengiriman.findByPk(id);

    if (!metodePengiriman) {
      return res.status(404).json({ message: "Metode pengiriman tidak ditemukan." });
    }

    metodePengiriman.nama_metode = nama_metode || metodePengiriman.nama_metode;
    metodePengiriman.deskripsi = deskripsi || metodePengiriman.deskripsi;

    await metodePengiriman.save();

    res.status(200).json({
      message: "Metode pengiriman berhasil diperbarui.",
      metodePengiriman,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

// Delete Metode Pengiriman by ID
exports.deleteMetodePengiriman = async (req, res) => {
  const { id } = req.params;

  try {
    const metodePengiriman = await MetodePengiriman.findByPk(id);

    if (!metodePengiriman) {
      return res.status(404).json({ message: "Metode pengiriman tidak ditemukan." });
    }

    await metodePengiriman.destroy();

    res.status(200).json({ message: "Metode pengiriman berhasil dihapus." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};
