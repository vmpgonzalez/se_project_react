// src/components/SideBar/SideBar.jsx
import React, { useContext, useMemo, useState } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

// component: profile sidebar
function SideBar({ onEditProfile, onSignOut }) {
  // state: user data
  const currentUser = useContext(CurrentUserContext);
  const name = currentUser?.name?.trim() || "User";
  const avatarUrl = currentUser?.avatar?.trim() || "";

  // helper: initials fallback
  const initials = useMemo(() => {
    return name
      .split(/\s+/)
      .slice(0, 2)
      .map((n) => n[0]?.toUpperCase() || "")
      .join("");
  }, [name]);

  // state: image validity
  const [imgOk, setImgOk] = useState(Boolean(avatarUrl));

  // ui: layout
  return (
    <aside className="sidebar" aria-label="Profile sidebar">
      {/* ui: user block */}
      <div className="sidebar__user">
        {/* ui: avatar / fallback */}
        {imgOk && avatarUrl ? (
          <img
            className="sidebar__avatar"
            src={avatarUrl}
            alt={`${name} avatar`}
            onError={() => setImgOk(false)}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div
            className="sidebar__avatar sidebar__avatar--fallback"
            aria-hidden="true"
            title={name}
          >
            {initials || "U"}
          </div>
        )}

        {/* ui: username */}
        <p className="sidebar__username" title={name}>
          {name}
        </p>
      </div>

      {/* ui: actions */}
      <ul className="sidebar__actions">
        <li>
          <button
            type="button"
            className="sidebar__action"
            onClick={onEditProfile}
          >
            Change profile data
          </button>
        </li>

        <li>
          <button type="button" className="sidebar__action" onClick={onSignOut}>
            Log out
          </button>
        </li>
      </ul>
    </aside>
  );
}

export default SideBar;
