const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Produk = sequelize.define("Produk", {
  id_produk: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_kategori: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nama_produk: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  gambar: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  deskripsi: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  harga: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  stok: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  dibuat_pada: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  terjual: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  tableName: "produk",
  timestamps: false, // Karena tabel memiliki kolom 'dibuat_pada', tidak perlu timestamps otomatis
});

module.exports = Produk;