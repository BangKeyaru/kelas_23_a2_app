require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const sequelize = require("./src/config/database");

// Import Routes
const userRoutes = require("./src/routes/userRoutes");
const kategoriRoutes = require("./src/routes/kategoriRoutes");
const produkRoutes = require("./src/routes/produkRoutes");
const pesananRoutes = require("./src/routes/pesananRoutes");
const alamatpelangganRoutes = require("./src/routes/alamatpelangganRoutes");
const metodepengirimanRoutes = require("./src/routes/metodepengirimanRoutes");
const detailpesananRoutes = require("./src/routes/detailpesananRoutes");
const metodepembayaranRoutes = require("./src/routes/metodepembayaranRoutes");
const transaksiPembayaranRoutes = require("./src/routes/transaksipembayaranRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Buat folder 'uploads' jika belum ada
if (!fs.existsSync(path.join("uploads"))) {
  fs.mkdirSync(path.join("uploads"), { recursive: true });
}
app.use("/uploads", express.static(path.join("uploads")));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/kategori", kategoriRoutes);
app.use("/api/produk", produkRoutes);
app.use("/api/pesanan", pesananRoutes);
app.use("/api/alamat-pelanggan", alamatpelangganRoutes);
app.use("/api/metode-pengiriman", metodepengirimanRoutes);
app.use("/api/detail-pesanan", detailpesananRoutes);
app.use("/api/metode-pembayaran", metodepembayaranRoutes);
app.use("/api/transaksi-pembayaran", transaksiPembayaranRoutes);

// Sync database and start server
sequelize.sync({ force: false }).then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
});