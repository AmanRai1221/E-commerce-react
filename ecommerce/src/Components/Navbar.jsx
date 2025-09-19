import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div id="header">
      {/* Use Link for SPA navigation */}
      <Link to="/">
        <img src="/img/Amazon logo.png" width="200px" />
      </Link>
      <div>
        <ul id="navbar">
          <li>
            <h3>
              <Link to="/">Home</Link>
            </h3>
          </li>
          <li>
            <h3>
              <Link to="/shop">Shop</Link>
            </h3>
          </li>
          <li>
            <h3>
              <Link to="/blog">Blog</Link>
            </h3>
          </li>
          <li>
            <h3>
              <Link to="/about">About</Link>
            </h3>
          </li>
          <li>
            <h3>
              <Link to="/contact">Contact</Link>
            </h3>
          </li>

          <li>
            <h3>
              <Link to="/cart">
                <i className="fa-solid fa-bag-shopping"></i>
              </Link>
            </h3>
          </li>

          {currentUser ? (
            <>
              <li>
                <h3 style={{ marginRight: 5 }}>
                  <span className="fs-4">{currentUser.name}</span>
                </h3>
              </li>
              <li>
                <h3>
                  <button
                    className="fs-4 fw-semibold"
                    onClick={handleLogout}
                    style={{
                      background: "none",
                      border: "none",
                      color: "inherit",
                      cursor: "pointer",
                    }}
                  >
                    Logout
                  </button>
                </h3>
              </li>
            </>
          ) : (
            <li>
              <h3>
                <Link to="/login">Login</Link>
              </h3>
            </li>
          )}
        </ul>
      </div>

      <div id="mobile">
        <Link to="/cart" className="cart">
          <i className="fa-solid fa-bag-shopping"></i>
        </Link>
        <i id="bar" className="fa-solid fa-bars"></i>
      </div>
    </div>
  );
};

export default Navbar;
