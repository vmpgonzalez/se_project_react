import React from "react";

function ItemModal({ onClose, item }) {
  return (
    <div className="modal">
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>
          X
        </button>
        <img src={item.link} alt={item.name} />
        <h2>{item.name}</h2>
      </div>
    </div>
  );
}

// ✅ ADD THIS LINE TO FIX THE ERROR
export default ItemModal;
