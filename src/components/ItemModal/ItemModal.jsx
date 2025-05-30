import React, { useEffect } from "react";
import "./ItemModal.css";
import closeIcon from "../../assets/close-button.png";

function ItemModal({ item, onClose, onDelete }) {
  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [onClose]);

  if (!item) return null;

  return (
    <div className="item-modal">
      <div className="item-modal__overlay" onClick={onClose}></div>

      <div className="item-modal__content">
        <button
          className="item-modal__close"
          onClick={onClose}
          aria-label="Close item modal"
        >
          <img src={closeIcon} alt="Close" className="item-modal__close-icon" />
        </button>

        <img
          src={item.link}
          alt={item.name}
          className="item-modal__image"
          onError={(e) => {
            e.target.src = "/fallback.jpg";
            e.target.alt = "Image failed to load";
          }}
        />

        <div className="item-modal__info">
          <div className="item-modal__header">
            <p className="item-modal__name">{item.name}</p>
            <button
              className="item-modal__delete"
              onClick={() => onDelete(item)}
            >
              Delete item
            </button>
          </div>
          <p className="item-modal__weather">Weather: {item.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
