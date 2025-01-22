import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import '../background.css'

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/users', {
        name: name,
        username: username,
        password: password,
        confPassword: confPassword,
      });
      navigate('/'); 
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.Message);
        setMsg(error.response.data.Message);
      }
    }
  };

  return (
    <div className="background d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: '500px' }}>
        <h2 className="text-center mb-4">Halaman Register</h2>
        {msg && <div class="alert alert-danger mt-3" role="alert">
            {msg}
        </div>}
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="nama" className="form-label">
              Nama
            </label>
            <input
              type="text"
              id="nama"
              className="form-control"
              placeholder="Masukkan nama Anda"
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
              placeholder="Masukkan username"
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
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Konfirmasi Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              placeholder="Masukkan ulang password"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>
        <div className="text-center mt-3">
          <p>Sudah punya akun? <a href="/">Silahkan Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
