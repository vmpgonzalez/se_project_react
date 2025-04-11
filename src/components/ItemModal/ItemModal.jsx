import React from "react";
import "./ItemModal.css";

function ItemModal({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}></div>
      <div className="modal__item-content">
        <button className="modal__close" onClick={onClose}>
          &times;
        </button>
        <img
          src={item.link}
          alt={item.name}
          className="modal__item-image"
          onError={(e) => {
            e.target.src = "/fallback.jpg"; // optional fallback image
            e.target.alt = "Image failed to load";
          }}
        />
        <div className="modal__item-info">
          <p className="modal__item-name">{item.name}</p>
          <p className="modal__item-weather">Weather: {item.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
