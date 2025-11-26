// src/components/ItemCard/ItemCard.jsx
import React from "react";
import "./ItemCard.css";
import likeIcon from "../../assets/heart-default.svg";
import likedIcon from "../../assets/heart-liked.svg";

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn, isLiked }) {
  const src = item.imageUrl || item.link;

  const handleLikeClick = (e) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      alert("Please log in to like items.");
      return;
    }

    if (onCardLike) {
      onCardLike({ id: item._id, isLiked });
    }
  };

  return (
    <li className="item-card" onClick={() => onCardClick(item)}>
      <div className="item-card__top">
        <p className="item-card__label">{item.name}</p>

        {/* ✅ Hide like button for logged-out users */}
        {isLoggedIn && (
          <button
            className="item-card__like"
            onClick={handleLikeClick}
            aria-label={isLiked ? "Unlike" : "Like"}
          >
            <img
              src={isLiked ? likedIcon : likeIcon}
              alt={isLiked ? "Unlike item" : "Like item"}
              className="item-card__like-icon"
            />
          </button>
        )}
      </div>

      <div className="item-card__image-wrapper">
        <img
          src={src}
          alt={item.name}
          className="item-card__image"
          onError={(e) => {
            e.currentTarget.src =
              "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
          }}
        />
      </div>
    </li>
  );
}

export default ItemCard;
