import React from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";

function Header({ weatherData, onAddClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <div className="header__left">
        <img src={logo} alt="WTWR Logo" className="header__logo" />
        <div className="header__location-info">
          <p className="header__date">
            {currentDate}
            {weatherData?.city ? `, ${weatherData.city}` : ""}
          </p>
        </div>
      </div>

      <div className="header__right">
        <button className="header__button" onClick={onAddClick}>
          + Add clothes
        </button>
        <p className="header__username">Victor Pacheco</p>
        <img src={avatar} alt="User Avatar" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
