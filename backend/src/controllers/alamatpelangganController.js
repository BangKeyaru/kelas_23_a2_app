const AlamatPelanggan = require("../models/AlamatPelanggan");
const User = require("../models/User");

// Get all alamat pelanggan
exports.getAllAlamat = async (req, res) => {
  try {
    const alamatList = await AlamatPelanggan.findAll({
      include: [{ model: User, as: "user", attributes: ["id_user", "nama_user", "email"] }],
    });
    res.status(200).json(alamatList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get alamat pelanggan by ID
exports.getAlamatById = async (req, res) => {
  const { id } = req.params;
  try {
    const alamat = await AlamatPelanggan.findByPk(id, {
      include: [{ model: User, as: "user", attributes: ["id_user", "nama_user", "email"] }],
    });
    if (!alamat) {
      return res.status(404).json({ message: "Alamat pelanggan not found" });
    }
    res.status(200).json(alamat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create new alamat pelanggan
exports.createAlamat = async (req, res) => {
  const { id_user, alamat } = req.body;
  if (!id_user || !alamat) {
    return res.status(400).json({ message: "id_user and alamat are required" });
  }
  try {
    const newAlamat = await AlamatPelanggan.create({ id_user, alamat });
    res.status(201).json({ message: "Alamat pelanggan created successfully", newAlamat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update alamat pelanggan by ID
exports.updateAlamat = async (req, res) => {
  const { id } = req.params;
  const { alamat } = req.body;
  try {
    const alamatPelanggan = await AlamatPelanggan.findByPk(id);
    if (!alamatPelanggan) {
      return res.status(404).json({ message: "Alamat pelanggan not found" });
    }
    alamatPelanggan.alamat = alamat || alamatPelanggan.alamat;
    await alamatPelanggan.save();
    res.status(200).json({ message: "Alamat pelanggan updated successfully", alamatPelanggan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete alamat pelanggan by ID
exports.deleteAlamat = async (req, res) => {
  const { id } = req.params;
  try {
    const alamatPelanggan = await AlamatPelanggan.findByPk(id);
    if (!alamatPelanggan) {
      return res.status(404).json({ message: "Alamat pelanggan not found" });
    }
    await alamatPelanggan.destroy();
    res.status(200).json({ message: "Alamat pelanggan deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};