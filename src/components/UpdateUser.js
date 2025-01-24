import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateUser = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [token, setToken] = useState('');
    const [msg, setMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState(''); // State untuk pesan sukses
    const navigate = useNavigate();
    const { id } = useParams();

    // Ambil token baru dan simpan ke state
    useEffect(() => {
        const refreshToken = async () => {
            try {
                const response = await axios.get("acceptable-fulfillment-production.up.railway.app/token");
                setToken(response.data.accessToken);
            } catch (error) {
                if (error.response) {
                    navigate('/'); // Jika token tidak valid, kembali ke halaman login
                }
            }
        };
        refreshToken();
    }, [navigate]);

    // Ambil data user berdasarkan ID dari server
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(
                    `acceptable-fulfillment-production.up.railway.app/users/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setName(response.data.name);
                setUsername(response.data.username);
            } catch (error) {
                console.error('Gagal mengambil data pengguna:', error);
                setMsg('Gagal mengambil data pengguna.');
            }
        };

        if (token) {
            fetchUserData();
        }
    }, [id, token]);

    // Fungsi untuk mengupdate data user
    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            const data = {
                name: name,
                username: username,
            };

            // Tambahkan password hanya jika diisi
            if (password) {
                data.password = password;
                data.confPassword = confPassword;
            }

            await axios.put(
                `acceptable-fulfillment-production.up.railway.app/users/${id}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setSuccessMsg('Data berhasil diperbarui!'); // Set pesan sukses
            setMsg(''); // Kosongkan pesan error jika ada
        } catch (error) {
            if (error.response) {
                console.error(error.response.data.message);
                setMsg(error.response.data.message);
                setSuccessMsg(''); // Kosongkan pesan sukses jika terjadi error
            }
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <div className="card shadow p-4" style={{ width: '400px' }}>
                <h2 className="text-center mb-4">Halaman Update</h2>
                {msg && (
                    <div className="alert alert-danger mt-3" role="alert">
                        {msg}
                    </div>
                )}
                {successMsg && (
                    <div className="alert alert-success mt-3" role="alert">
                        {successMsg}
                    </div>
                )}
                <form onSubmit={handleUpdateUser}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="form-control"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confPassword" className="form-label">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confPassword"
                            className="form-control"
                            placeholder="Confirm your password"
                            value={confPassword}
                            onChange={(e) => setConfPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateUser;