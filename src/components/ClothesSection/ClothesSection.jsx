// src/components/ClothesSection/ClothesSection.jsx
import React, { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";

// component: clothes section
function ClothesSection({
  clothingItems,
  onCardClick,
  onAddClick,
  onCardLike,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  // helper: check if current user liked the card
  const isItemLikedByMe = (item) => {
    const me = currentUser?._id;
    if (!me) return false;

    const likes = Array.isArray(item.likes) ? item.likes : [];
    return likes.some((u) =>
      typeof u === "string" ? u === me : u?._id === me
    );
  };

  // ui: render section
  return (
    <section className="clothes">
      {/* ui: header row */}
      <div className="clothes__header">
        <h2 className="clothes__title">Your items</h2>
        <button
          type="button"
          className="clothes__add"
          onClick={onAddClick}
          aria-label="Add new item"
        >
          + Add new
        </button>
      </div>

      {/* ui: items grid */}
      <ul className="clothes__grid">
        {clothingItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            isLoggedIn={isLoggedIn}
            isLiked={isItemLikedByMe(item)}
          />
        ))}
      </ul>
    </section>
  );
}

export default ClothesSection;
