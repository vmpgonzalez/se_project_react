import React from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png"; // Make sure this matches your file

function Header({ weatherData, onAddClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <img src={logo} alt="Logo" className="header__logo" />
        <a href="#" className="header__date-location">
          {currentDate}, {weatherData?.city || "Loading..."}
        </a>
      </div>

      <div className="header__right">
        <button className="header__button" onClick={onAddClick}>
          + Add clothes
        </button>
        <p className="header__username">Victor</p>
        <img src={avatar} alt="User avatar" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
