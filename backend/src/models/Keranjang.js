// src/models/Keranjang.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Produk = require("./Produk");
const User = require("./User"); // Pastikan Anda memiliki model User

const Keranjang = sequelize.define("Keranjang", {
  id_keranjang: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_produk: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  jumlah: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  dibuat_pada: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "keranjang",
  timestamps: false,
});

// Asosiasi
Keranjang.belongsTo(User, { as: "user", foreignKey: "id_user" });
Keranjang.belongsTo(Produk, { as: "produk", foreignKey: "id_produk" });

module.exports = Keranjang;
