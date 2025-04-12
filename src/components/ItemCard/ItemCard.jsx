import React from "react";
import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  return (
    <li className="item-card" onClick={() => onCardClick(item)}>
      <p className="item-card__label">{item.name}</p>
      <div className="item-card__image-wrapper">
        <img src={item.link} alt={item.name} className="item-card__image" />
      </div>
    </li>
  );
}

export default ItemCard;
