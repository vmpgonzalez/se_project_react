// src/components/DeleteConfirmationModal/DeleteConfirmationModal.jsx
import React, { useEffect } from "react";
import "./DeleteConfirmationModal.css";
import closeIcon from "../../assets/close-button.png";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal modal_type_confirm">
      <div className="modal__overlay" onClick={onClose}></div>
      <div className="modal__content modal__content_confirm">
        <button className="modal__close" onClick={onClose}>
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>
        <h2 className="modal__title">
          Are you sure you want to delete this item?
          <br />
          <span className="modal__subtitle">This action is irreversible.</span>
        </h2>
        <div className="modal__actions">
          <button
            className="modal__button modal__button_confirm"
            onClick={onConfirm}
          >
            Yes, delete
          </button>
          <button
            className="modal__button modal__button_cancel"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
