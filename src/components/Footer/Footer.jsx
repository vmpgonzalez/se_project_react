// src/components/Footer/Footer.jsx
import React from "react";
import "./Footer.css";

// component: footer
function Footer() {
  return (
    <footer className="footer">
      {/* ui: left text */}
      <p className="footer__text">Developed by Victor Pacheco</p>

      {/* ui: year */}
      <p className="footer__year">2025</p>
    </footer>
  );
}

export default Footer;
