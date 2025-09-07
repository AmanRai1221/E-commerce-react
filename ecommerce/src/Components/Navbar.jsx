import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div id="header">
      <a href="#">
        <img src="/img/Amazon logo.png" width="200px" />
      </a>
      <div>
        <ul id="navbar" >
          <li>
            <h3>
              <Link to="/">Home</Link>
            </h3>
          </li>
          <li>
            <h3>
              <Link to="/Shop">Shop</Link>
            </h3>
          </li>
          <li>
            <h3>
              <Link to="/Blog">Blog</Link>
            </h3>
          </li>
          <li>
            <h3>
              <Link to="/About">About</Link>
            </h3>
          </li>
          <li>
            <h3>
              <Link to="/Contact">Contact</Link>
            </h3>
          </li>
          <li>
            <h3>
              <Link to="/cart">
                <i className="fa-solid fa-bag-shopping"></i>
              </Link>
            </h3>
          </li>
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
