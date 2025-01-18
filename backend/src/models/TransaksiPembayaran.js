const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Pesanan = require("./Pesanan");
const MetodePembayaran = require("./MetodePembayaran");

const TransaksiPembayaran = sequelize.define(
  "TransaksiPembayaran",
  {
    id_transaksi_pembayaran: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    id_pesanan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Pesanan,
        key: "id_pesanan",
      },
    },
    id_metode_pembayaran: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: MetodePembayaran,
        key: "id_metode_pembayaran",
      },
    },
    jumlah_bayar: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status_pembayaran: {
      type: DataTypes.ENUM("pending", "berhasil", "gagal"),
      allowNull: false,
    },
    tanggal_pembayaran: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "transaksi_pembayaran",
    timestamps: false, // Disable createdAt and updatedAt fields
  }
);

// Associations
Pesanan.hasMany(TransaksiPembayaran, {
  foreignKey: "id_pesanan",
  as: "transaksiPembayaran",
});
TransaksiPembayaran.belongsTo(Pesanan, {
  foreignKey: "id_pesanan",
  as: "pesanan",
});

MetodePembayaran.hasMany(TransaksiPembayaran, {
  foreignKey: "id_metode_pembayaran",
  as: "transaksiPembayaran",
});
TransaksiPembayaran.belongsTo(MetodePembayaran, {
  foreignKey: "id_metode_pembayaran",
  as: "metodePembayaran",
});

module.exports = TransaksiPembayaran;
