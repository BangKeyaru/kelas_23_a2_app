const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const AlamatPelanggan = sequelize.define(
  "AlamatPelanggan",
  {
    id_alamat: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    alamat: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "alamat_pelanggan",
    timestamps: false, // Nonaktifkan createdAt dan updatedAt otomatis
  }
);

// Define associations
User.hasMany(AlamatPelanggan, { foreignKey: "id_user", as: "alamat" });
AlamatPelanggan.belongsTo(User, { foreignKey: "id_user", as: "user" });

module.exports = AlamatPelanggan;