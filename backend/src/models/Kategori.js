const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Produk = require("./Produk");

const Kategori = sequelize.define("Kategori", {
  id_kategori: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nama_kategori: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  dibuat_pada: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "kategori",
  timestamps: false,
});

// Definisikan asosiasi di sini
Kategori.hasMany(Produk, { as: "produk", foreignKey: "id_kategori" });
Produk.belongsTo(Kategori, { as: "kategori", foreignKey: "id_kategori" });

module.exports = Kategori;
