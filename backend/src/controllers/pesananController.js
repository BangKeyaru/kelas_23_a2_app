const Pesanan = require("../models/Pesanan");
const User = require("../models/User");

// Create a new order
exports.createPesanan = async (req, res) => {
    const { id_user, total_barang, status } = req.body;

    if (!id_user || !total_barang || !status) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newPesanan = await Pesanan.create({ id_user, total_barang, status });
        res.status(201).json({ message: "Order created successfully", pesanan: newPesanan });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all orders
exports.getAllPesanan = async (req, res) => {
    try {
        const pesanan = await Pesanan.findAll({ include: { model: User, as: 'user' } });
        res.status(200).json(pesanan);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get a single order by ID
exports.getPesananById = async (req, res) => {
    const { id } = req.params;

    try {
        const pesanan = await Pesanan.findByPk(id, { include: { model: User, as: 'user' } });
        if (!pesanan) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(pesanan);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update an order
exports.updatePesanan = async (req, res) => {
    const { id } = req.params;
    const { total_barang, status } = req.body;

    try {
        const pesanan = await Pesanan.findByPk(id);
        if (!pesanan) {
            return res.status(404).json({ message: "Order not found" });
        }

        pesanan.total_barang = total_barang || pesanan.total_barang;
        pesanan.status = status || pesanan.status;

        await pesanan.save();
        res.status(200).json({ message: "Order updated successfully", pesanan });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete an order
exports.deletePesanan = async (req, res) => {
    const { id } = req.params;

    try {
        const pesanan = await Pesanan.findByPk(id);
        if (!pesanan) {
            return res.status(404).json({ message: "Order not found" });
        }

        await pesanan.destroy();
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};