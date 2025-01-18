const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const MetodePembayaran = sequelize.define(
  "MetodePembayaran",
  {
    id_metode_pembayaran: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    nama_metode: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "metode_pembayaran",
    timestamps: false, // Disable createdAt and updatedAt
  }
);

module.exports = MetodePembayaran;