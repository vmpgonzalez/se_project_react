import React from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ weatherData, onAddClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/">
          <img src={logo} alt="WTWR Logo" className="header__logo" />
        </Link>
        <div className="header__location-info">
          <p className="header__date">
            {currentDate}
            {weatherData?.city ? `, ${weatherData.city}` : ""}
          </p>
        </div>
      </div>

      <div className="header__right">
        <ToggleSwitch />
        <button className="header__button" onClick={onAddClick}>
          + Add clothes
        </button>
        <div className="header__profile">
          <Link to="/profile" className="header__username">
            Victor Pacheco
          </Link>
          <Link to="/profile">
            <img src={avatar} alt="User Avatar" className="header__avatar" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
