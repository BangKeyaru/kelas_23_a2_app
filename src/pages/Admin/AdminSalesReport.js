// src/components/Admin/AdminSalesReport.js
import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav, Dropdown, Table, Form, Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./AdminSalesReport.css";

const AdminSalesReport = () => {
    const navigate = useNavigate();
    const [salesData] = useState([
        {
            id: 1,
            username: "john_doe",
            productCode: "P001",
            orderDate: "2024-12-03",
            orderTime: "10:30",
            totalPrice: 15000,
        },
        {
            id: 2,
            username: "jane_smith",
            productCode: "P002",
            orderDate: "2024-11-07",
            orderTime: "14:45",
            totalPrice: 25000,
        },
    ]);

    const [todaySales, setTodaySales] = useState(0);
    const [itemsSoldToday, setItemsSoldToday] = useState(0);
    const [filterMonth, setFilterMonth] = useState(new Date().getMonth() + 1);
    const [filterYear, setFilterYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        const todaySalesData = salesData.filter(sale => sale.orderDate === today);
        setTodaySales(todaySalesData.length);
        setItemsSoldToday(todaySalesData.reduce((acc, sale) => acc + 1, 0));
    }, [salesData]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        if (name === "month") setFilterMonth(value);
        if (name === "year") setFilterYear(value);
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    };

    return (
        <>
            {/* Navbar Header */}
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand>Admin Dashboard</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={() => navigate("/admin/dashboard")}>Beranda</Nav.Link>
                            <Nav.Link onClick={() => navigate("/admin/products")}>Produk</Nav.Link>
                            <Nav.Link onClick={() => navigate("/admin/orders")}>Pemesanan</Nav.Link>
                            <Nav.Link onClick={() => navigate("/admin/users")}>Pengguna</Nav.Link>
                            <Nav.Link onClick={() => navigate("/admin/sales")}>Laporan Penjualan</Nav.Link>
                        </Nav>
                        <Dropdown align="end">
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                <FaUserCircle size={24} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => navigate("/admin-account")}>
                                    Akun Admin
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Sales Report Content */}
            <Container className="admin-sales-report mt-4">
                <h2>Laporan Penjualan</h2>
                <p>Hari ini: <strong>{new Date().toLocaleDateString()}</strong></p>

                <div className="sales-summary">
                    <div className="summary-item">
                        <h4>Jumlah Pengguna Membeli Hari ini:</h4>
                        <p>{todaySales} pengguna</p>
                    </div>
                    <div className="summary-item">
                        <h4>Jumlah Barang Terjual Hari ini:</h4>
                        <p>{itemsSoldToday} barang</p>
                    </div>
                </div>

                {/* Filters for Month and Year */}
                <div className="d-flex justify-content-end mb-4">
                    <Form className="filter-form d-flex align-items-center">
                        {/* Filter for Month */}
                        <Form.Group controlId="filterMonth" className="mr-3">
                            <Form.Label className="mr-2">Bulan</Form.Label>
                            <Form.Control
                                as="select"
                                name="month"
                                value={filterMonth}
                                onChange={handleFilterChange}
                            >
                                {[...Array(12).keys()].map((month) => (
                                    <option key={month + 1} value={month + 1}>
                                        {new Date(0, month).toLocaleString("default", { month: "long" })}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        {/* Filter for Year */}
                        <Form.Group controlId="filterYear" className="mr-3">
                            <Form.Label className="mr-2">Tahun</Form.Label>
                            <Form.Control
                                as="select"
                                name="year"
                                value={filterYear}
                                onChange={handleFilterChange}
                            >
                                {Array.from(
                                    { length: new Date().getFullYear() - 2019 },
                                    (_, i) => 2020 + i
                                ).map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        {/* Button for Applying Filters */}
                        <Button
                            variant="primary"
                            onClick={() => console.log("Filter applied")}
                            className="ml-3 mb-2"
                        >
                            Tampilkan
                        </Button>
                    </Form>
                </div>

                {/* Sales Table */}
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Username Pelanggan</th>
                            <th>No. Kode Barang</th>
                            <th>Tanggal</th>
                            <th>Waktu</th>
                            <th>Harga Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salesData.map((sale, index) => (
                            <tr key={sale.id}>
                                <td>{index + 1}</td>
                                <td>{sale.username}</td>
                                <td>{sale.productCode}</td>
                                <td>{sale.orderDate}</td>
                                <td>{sale.orderTime}</td>
                                <td>Rp {sale.totalPrice.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
};

export default AdminSalesReport;
