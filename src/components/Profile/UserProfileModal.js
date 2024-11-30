import React, { useState } from "react";
import { Modal, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./UserProfileModal.css";

const UserProfileModal = ({ show, handleClose = () => {} }) => {
    const [isActionInProgress, setIsActionInProgress] = useState(false); // Menambahkan state untuk aksi yang sedang berlangsung
    const [showLogoutMessage, setShowLogoutMessage] = useState(false);
    const navigate = useNavigate();

    // Fungsi untuk menangani aksi klik pada tombol "Edit Profile" atau "Riwayat Pemesanan"
    const handleActionClick = () => {
        setIsActionInProgress(true); // Set state menjadi true untuk mencegah penutupan modal
    };

    // Fungsi untuk logout
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        sessionStorage.clear();
        setShowLogoutMessage(true);

        setTimeout(() => {
            navigate("/login");
            handleClose(); // Menutup modal setelah logout
        }, 2000);
    };

    return (
        <Modal 
            show={show} 
            onHide={!isActionInProgress ? handleClose : null} // Hanya membolehkan penutupan modal jika tidak ada aksi yang sedang berlangsung
            centered
        >
            <Modal.Header closeButton={!isActionInProgress}> {/* Menonaktifkan tombol close jika ada aksi */}
                <Modal.Title>Profil Pengguna</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row className="text-center">
                        <Col xs={12} className="mb-2">
                            <Link to="/edit-profile" onClick={() => {handleActionClick(); handleClose();}}>
                                <Button variant="primary" className="w-100">
                                    Edit Profile
                                </Button>
                            </Link>
                        </Col>

                        <Col xs={12} className="mb-2">
                            <Link to="/order-history" onClick={() => {handleActionClick(); handleClose();}}>
                                <Button variant="secondary" className="w-100">
                                    Riwayat Pemesanan
                                </Button>
                            </Link>
                        </Col>

                        <Col xs={12} className="mb-2">
                            <Button variant="danger" className="w-100" onClick={handleLogout}>
                                Logout
                            </Button>
                        </Col>
                    </Row>

                    {/* Pesan Logout berhasil */}
                    {showLogoutMessage && (
                        <Alert variant="success" className="mt-3 text-center">
                            Anda berhasil Logout!
                        </Alert>
                    )}
                </Container>
            </Modal.Body>
        </Modal>
    );
};

export default UserProfileModal;
