// src/components/Profile/Profile.jsx
import React from "react";
import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

// component: profile page
function Profile({
  clothingItems,
  onCardClick,
  onAddClick,
  onEditProfile,
  onSignOut,
  onCardLike,
  isLoggedIn,
}) {
  // ui: two-column layout (sidebar + items)
  return (
    <section className="profile">
      {/* ui: left sidebar */}
      <SideBar onEditProfile={onEditProfile} onSignOut={onSignOut} />

      {/* ui: right clothing grid */}
      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onAddClick={onAddClick}
        onCardLike={onCardLike}
        isLoggedIn={isLoggedIn}
      />
    </section>
  );
}

export default Profile;
