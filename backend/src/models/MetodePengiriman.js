const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const MetodePengiriman = sequelize.define(
  "MetodePengiriman",
  {
    id_metode_pengiriman: {
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
    tableName: "metode_pengiriman",
    timestamps: false, // Nonaktifkan otomatis createdAt dan updatedAt
  }
);

module.exports = MetodePengiriman;