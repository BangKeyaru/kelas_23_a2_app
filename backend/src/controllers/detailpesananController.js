const DetailPesanan = require("../models/DetailPesanan");
const Pesanan = require("../models/Pesanan");
const Produk = require("../models/Produk");
const AlamatPelanggan = require("../models/AlamatPelanggan");
const MetodePengiriman = require("../models/MetodePengiriman");

// Get all detail pesanan
exports.getAllDetailPesanan = async (req, res) => {
  try {
    const details = await DetailPesanan.findAll({
      include: [
        { model: Pesanan, as: "pesanan" },
        { model: Produk, as: "produk" },
        { model: AlamatPelanggan, as: "alamatPelanggan" },
        { model: MetodePengiriman, as: "metodePengiriman" },
      ],
    });
    res.status(200).json(details);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get detail pesanan by ID
exports.getDetailPesananById = async (req, res) => {
  try {
    const { id } = req.params;
    const detail = await DetailPesanan.findByPk(id, {
      include: [
        { model: Pesanan, as: "pesanan" },
        { model: Produk, as: "produk" },
        { model: AlamatPelanggan, as: "alamatPelanggan" },
        { model: MetodePengiriman, as: "metodePengiriman" },
      ],
    });

    if (!detail) {
      return res.status(404).json({ message: "Detail pesanan not found" });
    }

    res.status(200).json(detail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new detail pesanan
exports.createDetailPesanan = async (req, res) => {
  try {
    const { id_pesanan, id_produk, id_alamat, id_metode_pengiriman, kuantitas } = req.body;

    const newDetailPesanan = await DetailPesanan.create({
      id_pesanan,
      id_produk,
      id_alamat,
      id_metode_pengiriman,
      kuantitas,
    });

    res.status(201).json({ message: "Detail pesanan created successfully", detailPesanan: newDetailPesanan });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update detail pesanan
exports.updateDetailPesanan = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_pesanan, id_produk, id_alamat, id_metode_pengiriman, kuantitas } = req.body;

    const detailPesanan = await DetailPesanan.findByPk(id);
    if (!detailPesanan) {
      return res.status(404).json({ message: "Detail pesanan not found" });
    }

    detailPesanan.id_pesanan = id_pesanan || detailPesanan.id_pesanan;
    detailPesanan.id_produk = id_produk || detailPesanan.id_produk;
    detailPesanan.id_alamat = id_alamat || detailPesanan.id_alamat;
    detailPesanan.id_metode_pengiriman = id_metode_pengiriman || detailPesanan.id_metode_pengiriman;
    detailPesanan.kuantitas = kuantitas || detailPesanan.kuantitas;

    await detailPesanan.save();

    res.status(200).json({ message: "Detail pesanan updated successfully", detailPesanan });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete detail pesanan
exports.deleteDetailPesanan = async (req, res) => {
  try {
    const { id } = req.params;

    const detailPesanan = await DetailPesanan.findByPk(id);
    if (!detailPesanan) {
      return res.status(404).json({ message: "Detail pesanan not found" });
    }

    await detailPesanan.destroy();
    res.status(200).json({ message: "Detail pesanan deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};