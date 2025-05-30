import React from "react";
import "./SideBar.css";
import avatar from "../../assets/avatar.png";

function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <img src={avatar} alt="User Avatar" className="sidebar__avatar" />
        <p className="sidebar__username">Victor Pacheco</p>
      </div>
      {/* Other content below */}
    </div>
  );
}

export default SideBar;
