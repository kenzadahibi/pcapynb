import React from "react";
import './Navbar.css'
import bcp from '../../assets/bcp.png'
const Navbar = () => {
  return (
    <nav class="navbar">
      <div class="navbar-container">
        <div class="navbar-logo">
          <img src={bcp} alt="Logo" />
        </div>
        <ul class="navbar-links">
          <li>
            <a href="#">Contacts</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Jobs</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;