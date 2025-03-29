import React from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";

function Header() {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <img
          src={logo} //
          alt="WTWR Logo"
          className="header__logo"
        />
      </div>

      <div className="header__center">
        <p className="header__date">{currentDate}</p>
        <p className="header__location">Seattle, WA</p>
      </div>

      <div className="header__right">
        <button className="header__button">+ Add Clothes</button>
        <p className="header__username">Victor</p>
        <img
          src={avatar} //
          alt="User Avatar"
          className="header__avatar"
        />
      </div>
    </header>
  );
}

export default Header;
