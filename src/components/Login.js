import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../background.css'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const Auth = async (e) => {
        e.preventDefault();
        try {
          await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
            username: username,
            password: password,
          });
          navigate('/home'); 
        } catch (error) {
          if (error.response) {
            console.log(error.response.data.Message);
            setMsg(error.response.data.Message);
          }
        }
      };

  return (
    <div className="background d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">Halaman Login</h2>
        {msg && <div class="alert alert-danger mt-3" role="alert">
            {msg}
        </div>}
        <form onSubmit={Auth}>
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
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <div className="text-center mt-3">
          <p>Belum punya akun? <a href="/register">Silahkan daftar</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;