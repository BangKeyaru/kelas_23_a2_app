const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Pesanan = require("./Pesanan");
const Produk = require("./Produk");
const AlamatPelanggan = require("./AlamatPelanggan");
const MetodePengiriman = require("./MetodePengiriman");

const DetailPesanan = sequelize.define(
  "DetailPesanan",
  {
    id_detail_pesanan: {
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
    id_produk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Produk,
        key: "id_produk",
      },
    },
    id_alamat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: AlamatPelanggan,
        key: "id_alamat",
      },
    },
    id_metode_pengiriman: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: MetodePengiriman,
        key: "id_metode_pengiriman",
      },
    },
    kuantitas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "detail_pesanan",
    timestamps: false, // Disable createdAt and updatedAt
  }
);

// Associations
Pesanan.hasMany(DetailPesanan, { foreignKey: "id_pesanan", as: "detailPesanan" });
DetailPesanan.belongsTo(Pesanan, { foreignKey: "id_pesanan", as: "pesanan" });

Produk.hasMany(DetailPesanan, { foreignKey: "id_produk", as: "detailPesanan" });
DetailPesanan.belongsTo(Produk, { foreignKey: "id_produk", as: "produk" });

AlamatPelanggan.hasMany(DetailPesanan, { foreignKey: "id_alamat", as: "detailPesanan" });
DetailPesanan.belongsTo(AlamatPelanggan, { foreignKey: "id_alamat", as: "alamatPelanggan" });

MetodePengiriman.hasMany(DetailPesanan, { foreignKey: "id_metode_pengiriman", as: "detailPesanan" });
DetailPesanan.belongsTo(MetodePengiriman, { foreignKey: "id_metode_pengiriman", as: "metodePengiriman" });

module.exports = DetailPesanan;
