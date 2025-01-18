const Kategori = require("../models/Kategori");

// Tambahkan kategori (Admin Only)
exports.createKategori = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Akses ditolak. Hanya admin yang dapat membuat kategori." });
    }

    const { nama_kategori } = req.body;
    if (!nama_kategori) {
      return res.status(400).json({ message: "Nama kategori diperlukan" });
    }

    const kategori = await Kategori.create({ nama_kategori });
    res.status(201).json({ message: "Kategori berhasil dibuat", kategori });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

// Mendapatkan semua kategori (Accessible by Everyone)
exports.getAllKategori = async (req, res) => {
  try {
    const kategori = await Kategori.findAll();
    res.status(200).json(kategori);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

// Mendapatkan kategori berdasarkan ID (Accessible by Everyone)
exports.getKategoriById = async (req, res) => {
  try {
    const { id } = req.params;
    const kategori = await Kategori.findByPk(id);
    if (!kategori) {
      return res.status(404).json({ message: "Kategori tidak ditemukan" });
    }
    res.status(200).json(kategori);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

// Memperbarui kategori (Admin Only)
exports.updateKategori = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Akses ditolak. Hanya admin yang dapat memperbarui kategori." });
    }

    const { id } = req.params;
    const { nama_kategori } = req.body;

    const kategori = await Kategori.findByPk(id);
    if (!kategori) {
      return res.status(404).json({ message: "Kategori tidak ditemukan" });
    }

    kategori.nama_kategori = nama_kategori || kategori.nama_kategori;
    await kategori.save();

    res.status(200).json({ message: "Kategori berhasil diperbarui", kategori });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

// Menghapus kategori (Admin Only)
exports.deleteKategori = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Akses ditolak. Hanya admin yang dapat menghapus kategori." });
    }

    const { id } = req.params;

    const kategori = await Kategori.findByPk(id);
    if (!kategori) {
      return res.status(404).json({ message: "Kategori tidak ditemukan" });
    }

    await kategori.destroy();
    res.status(200).json({ message: "Kategori berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};
