// src/components/Login/Login.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"; // Import axios untuk melakukan permintaan HTTP
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // State untuk menyimpan pesan error
    const navigate = useNavigate();

    // URL backend dari file .env
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/users";

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Kirim permintaan POST ke backend
            const response = await axios.post(`${API_URL}/login`, { email, password });

            // Ambil data dari respons
            const { authToken, role, redirectPath } = response.data;

            // Simpan token dan peran pengguna ke localStorage
            localStorage.setItem("authToken", authToken);
            localStorage.setItem("userRole", role);

            // Hapus pesan error jika ada
            setErrorMessage("");

            // Arahkan pengguna ke halaman sesuai peran mereka
            navigate(redirectPath);
        } catch (error) {
            // Tangani error dan tampilkan pesan
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Terjadi kesalahan. Silakan coba lagi.");
            }
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin} className="login-form">
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <button type="submit">Login</button> 
            </form>
            <p>Belum punya akun? <Link to="/register">Register</Link></p>
        </div>
    );
};

export default Login;
