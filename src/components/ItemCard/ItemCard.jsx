import React from "react";
import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  return (
    <li className="item-card" onClick={() => onCardClick(item)}>
      <img src={item.link} alt={item.name} className="item-card__image" />
      <p className="item-card__name">{item.name}</p>
    </li>
  );
}

export default ItemCard;
