require('dotenv').config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false, // Nonaktifkan logging query
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1); // Hentikan server jika koneksi gagal
  });

module.exports = sequelize;