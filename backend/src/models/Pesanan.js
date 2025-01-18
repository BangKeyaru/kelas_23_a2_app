const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Pesanan = sequelize.define('Pesanan', {
  id_pesanan: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id_user',
    },
  },
  total_barang: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('tertunda', 'diproses', 'dikirim', 'selesai'),
    allowNull: false,
  },
  dibuat_pada: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'pesanan',
  timestamps: false,
});

Pesanan.belongsTo(User, { foreignKey: 'id_user', as: 'user' });

module.exports = Pesanan;