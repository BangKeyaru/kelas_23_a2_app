import React, { useState, useContext } from 'react';
import { Navbar, Nav, Container, InputGroup, FormControl, Button, Image, Badge, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaSearch, FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import { UserContext } from '../../context/UserContext'; // Context untuk data pengguna
import { CartContext } from '../../context/CartContext'; // Context untuk data keranjang
import './ProdukToko.css';
import UserProfileModal from "../Profile/UserProfileModal"; // Modal untuk profil pengguna
import ProductDetailModal from "../Product/ProductDetailModal"; // Modal untuk detail produk

const ProdukToko = () => {
    const { profilePicture } = useContext(UserContext); // Ambil gambar profil dari context
    const { cartItems } = useContext(CartContext); // Ambil data keranjang dari context
    const [selectedCategory, setSelectedCategory] = useState("sembako"); // Kategori yang dipilih
    const [showProfileModal, setShowProfileModal] = useState(false); // State untuk menampilkan modal profil
    const [showProductModal, setShowProductModal] = useState(false); // State untuk menampilkan modal produk
    const [selectedProduct, setSelectedProduct] = useState(null); // Produk yang dipilih untuk ditampilkan di modal

    // Fungsi untuk menangani klik pada kategori
    const handleCategoryClick = (category) => setSelectedCategory(category);

    // Fungsi untuk menangani klik pada produk
    const handleProductClick = (product) => {
        setSelectedProduct(product); // Simpan produk yang dipilih
        setShowProductModal(true);  // Tampilkan modal produk
    };

    // Fungsi untuk menutup modal produk
    const handleCloseProductModal = () => {
        setShowProductModal(false);
        setSelectedProduct(null); // Hapus produk yang dipilih setelah modal ditutup
    };

    // Fungsi untuk menutup modal profil
    const handleCloseProfileModal = () => {
        setShowProfileModal(false); // Menutup modal profil
    };

    const products = {
        sembako: [
            { id: 1, name: "Beras Premium", price: 50000, sold: 120, stock: 50, imageUrl: "https://via.placeholder.com/150" },
            { id: 2, name: "Minyak Goreng", price: 20000, sold: 80, stock: 30, imageUrl: "https://via.placeholder.com/150" },
        ],
        obat: [
            { id: 3, name: "Paracetamol", price: 15000, sold: 60, stock: 100, imageUrl: "https://via.placeholder.com/150" },
        ],
        alat_tulis: [
            { id: 4, name: "Pensil", price: 5000, sold: 200, stock: 300, imageUrl: "https://via.placeholder.com/150" },
        ],
        minuman: [
            { id: 5, name: "Air Mineral", price: 3000, sold: 100, stock: 200, imageUrl: "https://via.placeholder.com/150" },
        ],
        alat_mandi: [
            { id: 6, name: "Sabun Mandi", price: 7000, sold: 150, stock: 80, imageUrl: "https://via.placeholder.com/150" },
        ],
        snacks: [
            { id: 7, name: "Keripik Kentang", price: 10000, sold: 90, stock: 40, imageUrl: "https://via.placeholder.com/150" },
        ],
    };

    return (
        <div className="home-container">
            {/* Navbar */}
            <Navbar bg="light" expand="lg" className="mb-4">
                <Container>
                    <Navbar.Brand href="/"><h1>Toko Yenni</h1></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto d-flex align-items-center">
                            <Nav.Link as={Link} to="/" className="me-3">Beranda</Nav.Link>
                            <Nav.Link as={Link} to="/products" className="me-3">Produk</Nav.Link>
                            <Nav.Link as={Link} to="/store-info" className="me-3">Informasi Toko</Nav.Link>
                            <InputGroup className="me-3 search-bar">
                                <FormControl type="search" placeholder="Cari barang..." aria-label="Search" />
                                <Button variant="outline-success">
                                    <FaSearch />
                                </Button>
                            </InputGroup>
                            <Nav.Link onClick={() => setShowProfileModal(true)} className="d-flex align-items-center me-3 profile-section">
                                {profilePicture ? (
                                    <Image src={profilePicture} roundedCircle width={32} height={32} alt="User" className="me-2 profile-picture" />
                                ) : (
                                    <FaUserCircle size={32} className="me-2 profile-picture" />
                                )}
                                <span className="user-name">Evelyn</span>
                            </Nav.Link>
                            <Nav.Link as={Link} to="/cart" className="position-relative cart-icon">
                                <FaShoppingCart size={24} />
                                {cartItems.length > 0 && (
                                    <Badge pill bg="danger" className="cart-badge position-absolute top-0 start-100 translate-middle">
                                        {cartItems.length}
                                    </Badge>
                                )}
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Kategori */}
            <Container className="category-section-title mb-4">
                <h2 className="text-start">Kategori</h2>
            </Container>
            <Container className="category-section mb-4">
                <Row>
                    {Object.keys(products).map((category) => (
                        <Button
                            key={category}
                            variant={selectedCategory === category ? "primary" : "outline-primary"}
                            onClick={() => handleCategoryClick(category)}
                            className="category-button"
                        >
                            <Image src="https://via.placeholder.com/150" rounded className="category-image mb-2" />
                            <h5 className="category-name">{category.charAt(0).toUpperCase() + category.slice(1)}</h5>
                        </Button>
                    ))}
                </Row>
            </Container>

            {/* Produk */}
            <Container>
                <Row>
                    {products[selectedCategory].map((product) => (
                        <Col md={4} key={product.id} className="mb-4">
                            <Card onClick={() => handleProductClick(product)}> {/* Klik untuk detail */}
                                <Card.Img variant="top" src={product.imageUrl} />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>Harga: Rp{product.price.toLocaleString()}</Card.Text>
                                    <Card.Text>Stok: {product.stock}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* Modal Produk */}
            {showProductModal && (
                <ProductDetailModal
                    show={showProductModal}
                    handleClose={handleCloseProductModal} // Berikan fungsi handleClose
                    product={selectedProduct}
                />
            )}

            {/* Modal Profil */}
            {showProfileModal && (
                <UserProfileModal
                    show={showProfileModal}
                    handleClose={handleCloseProfileModal} // Menggunakan handleCloseProfileModal
                />
            )}

            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2024 Toko Kelontong. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default ProdukToko;
