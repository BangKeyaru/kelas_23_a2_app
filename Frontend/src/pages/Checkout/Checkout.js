import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext"; 
import { Container, Row, Col, Form, Button, Modal, Navbar, Nav, InputGroup, FormControl, Image, Badge } from "react-bootstrap";
import { FaSearch, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import './Checkout.css';


const Checkout = () => {
    const navigate = useNavigate();
    const { cartItems } = useContext(CartContext);
    const { profilePicture } = useContext(UserContext); 

    const calculateSubtotal = () => {
        return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    };

    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [desaKelurahan, setDesaKelurahan] = useState(""); // Village/Kelurahan
    const [rtRw, setRtRw] = useState(""); // RT/RW
    const [kodePos, setKodePos] = useState(""); // Postal code
    const [deliveryNotes, setDeliveryNotes] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    const shippingCost = 10000; 
    const subtotal = calculateSubtotal();
    const total = subtotal + shippingCost;

    const handleCheckout = () => {
        if (name && phoneNumber && desaKelurahan && rtRw && kodePos) {
            setShowSuccess(true); 
            setTimeout(() => {
                navigate("/"); 
            }, 3000);
        } else {
            alert("Please fill in all required fields.");
        }
    };

    const handleEditCart = () => {
        navigate("/cart"); 
    };

    const handleProfileClick = () => {
        navigate("/profile"); 
    };

    return (
        <>
            {/* Header Navbar with Profile and Cart icons */}
            <Navbar bg="light" expand="lg" className="mb-4">
                <Container>
                    <Navbar.Brand href="/">Toko Yenni</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto d-flex align-items-center">
                            {/* Link to Home */}
                            <Nav.Link as={Link} to="/" className="me-3">Beranda</Nav.Link>
                            <Nav.Link as={Link} to="/products" className="me-3">Produk</Nav.Link>
                            <Nav.Link as={Link} to="/store-info" className="me-3">Informasi Toko</Nav.Link>

                            {/* Search Bar */}
                            <InputGroup className="me-3 search-bar">
                                <FormControl type="search" placeholder="Cari barang..." aria-label="Search" />
                                <Button variant="outline-success">
                                    <FaSearch />
                                </Button>
                            </InputGroup>

                            {/* Profile Section */}
                            <Nav.Link onClick={handleProfileClick} className="d-flex align-items-center me-3">
                                {profilePicture ? (
                                    <Image src={profilePicture} roundedCircle width={32} height={32} alt="User" className="me-2" />
                                ) : (
                                    <FaUserCircle size={32} className="me-2" />
                                )}
                                <span className="user-name">Evelyn</span>
                            </Nav.Link>

                            {/* Cart Section */}
                            <Nav.Link as={Link} to="/cart" className="position-relative">
                                <FaShoppingCart size={24} />
                                {cartItems.length > 0 && (
                                    <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                                        {cartItems.length}
                                    </Badge>
                                )}
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Main Checkout Form */}
            <Container className="checkout-container mt-4">
                <h2>Checkout</h2>
                <Row className="mt-4">
                    <Col md={5} className="mb-4">
                        <div className="p-3 border rounded">
                            <h4>Order Summary</h4>
                            <div className="mt-3">
                                <p>Subtotal: Rp{subtotal.toLocaleString()}</p>
                                <p>Items: {cartItems.length}</p>
                                <p>Shipping Cost: Rp{shippingCost.toLocaleString()}</p>
                                <hr />
                                <p className="fw-bold">Total: Rp{total.toLocaleString()}</p>
                            </div>
                        </div>
                    </Col>

                    <Col md={7} className="mb-4">
                        <div className="p-3 border rounded">
                            <h4>Place Your Order</h4>
                            <Form className="mt-3">
                                <Form.Group className="mb-3" controlId="formName">
                                    <Form.Label>Your Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formPhoneNumber">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your phone number"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formPaymentMethod">
                                    <Form.Label>Payment Method</Form.Label>
                                    <Form.Select
                                        value={paymentMethod}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    >
                                        <option value="COD">COD</option>
                                        <option value="Bank Transfer">Bank Transfer</option>
                                    </Form.Select>
                                </Form.Group>

                                {/* Address Fields */}
                                <Form.Group className="mb-3" controlId="formDesaKelurahan">
                                    <Form.Label>Desa/Kelurahan</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={desaKelurahan}
                                        onChange={(e) => setDesaKelurahan(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formRtRw">
                                    <Form.Label>RT/RW</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={rtRw}
                                        onChange={(e) => setRtRw(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formKodePos">
                                    <Form.Label>Kode Pos</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={kodePos}
                                        onChange={(e) => setKodePos(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formDeliveryNotes">
                                    <Form.Label>Delivery Notes</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={2}
                                        placeholder="Additional delivery notes (optional)"
                                        value={deliveryNotes}
                                        onChange={(e) => setDeliveryNotes(e.target.value)}
                                    />
                                </Form.Group>

                                <div className="checkout-buttons">
                                    <Button variant="secondary" onClick={handleEditCart}>
                                        Edit Cart
                                    </Button>
                                    <Button variant="primary" onClick={handleCheckout}>
                                        Checkout
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </Col>
                </Row>

                {/* Success Modal */}
                <Modal show={showSuccess} onHide={() => setShowSuccess(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Order Successful</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Your order has been placed successfully! Please check your order history.</p>
                    </Modal.Body>
                </Modal>
            </Container>
        </>
    );
};

export default Checkout;
    