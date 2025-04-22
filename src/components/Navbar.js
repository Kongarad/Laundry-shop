// Navbar.js
import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">🧼 ร้านซักผ้า 24 ชม.</div>
      <ul className="navbar-links">
        <li><a href="#machines">เครื่องซักผ้า</a></li>
        <li><a href="#about">เกี่ยวกับ</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
