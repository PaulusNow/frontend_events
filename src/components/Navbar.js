import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Perbaikan import
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState(""); // Tambahkan state untuk ID user
  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // Tambahkan state untuk is_admin
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/token`);
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setName(decoded.name);
      setId(decoded.userId); // Ambil ID user dari token
      setIsAdmin(decoded.isAdmin === true); // Cek apakah user admin
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };

  const Logout = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/logout`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand">
          Event Mania
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/home">
                Home
              </Link>
            </li>
            {isAdmin && ( // Tampilkan menu Admin jika isAdmin true
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  Halaman Admin
                </Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Welcome, {name ? name : "Guest"}
              </a>
              <ul className="dropdown-menu">
                {token && (
                  <>
                    <li>
                      <Link className="dropdown-item" to={`/update/${id}`}>
                        Edit Profil
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/events">
                        Daftar Event
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={Logout}>
                        Log Out
                      </button>
                    </li>
                  </>
                )}
                {!token && (
                  <li>
                    <Link className="dropdown-item" to="/login">
                      Log In
                    </Link>
                  </li>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
