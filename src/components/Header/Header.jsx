// src/components/Header/Header.jsx
import React, { useContext, useMemo } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

// component: header
function Header({
  weatherData,
  onAddClick,
  isLoggedIn,
  onOpenLogin,
  onOpenRegister,
}) {
  // state: user + formatted date
  const currentUser = useContext(CurrentUserContext);
  const currentDate = useMemo(
    () =>
      new Date().toLocaleString("default", {
        month: "long",
        day: "numeric",
      }),
    []
  );

  // ui: avatar + fallback initial
  const avatarUrl = currentUser?.avatar || "";
  const firstLetter =
    currentUser?.name?.trim()?.charAt(0)?.toUpperCase() || "?";

  // ui: layout
  return (
    <header className={`header ${isLoggedIn ? "header--loggedin" : ""}`}>
      {/* ui: logo + date */}
      <div className="header__brand">
        <Link to="/" aria-label="Home">
          <img src={logo} alt="WTWR Logo" className="header__logo" />
        </Link>
        <p className="header__date">
          {currentDate}
          {weatherData?.city ? `, ${weatherData.city}` : ""}
        </p>
      </div>

      {/* ui: controls (toggle + buttons) */}
      <div className="header__controls">
        <ToggleSwitch />

        {/* ui: logged-in view */}
        {isLoggedIn ? (
          <>
            {/* ui: add clothes button */}
            <button className="header__button" onClick={onAddClick}>
              + Add clothes
            </button>

            {/* ui: profile cluster */}
            <div className="header__profile">
              <Link to="/profile" className="header__username">
                {currentUser?.name || "Me"}
              </Link>
              <Link
                to="/profile"
                className="header__avatar-wrap"
                aria-label="Profile"
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={currentUser?.name || "User avatar"}
                    className="header__avatar"
                  />
                ) : (
                  <div className="header__avatar header__avatar--placeholder">
                    {firstLetter}
                  </div>
                )}
              </Link>
            </div>
          </>
        ) : (
          // ui: logged-out view
          <>
            <button className="header__link" onClick={onOpenRegister}>
              Sign up
            </button>
            <button className="header__link" onClick={onOpenLogin}>
              Log in
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
