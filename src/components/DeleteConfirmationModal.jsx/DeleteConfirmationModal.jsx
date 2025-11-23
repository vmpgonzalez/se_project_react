// src/components/DeleteConfirmationModal/DeleteConfirmationModal.jsx
import React, { useEffect } from "react";
import "../ModalWithForm/ModalWithForm.css";
import "./DeleteConfirmationModal.css";
import closeIcon from "../../assets/close-button-grey.svg";

// component: delete confirmation modal
function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}) {
  // effect: close on ESC key
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // early exit: hidden modal
  if (!isOpen) return null;

  // ui: modal layout
  return (
    <div
      className="form-modal form-modal--confirm"
      role="dialog"
      aria-modal="true"
    >
      {/* ui: overlay */}
      <div className="form-modal__overlay" onClick={onClose} />

      {/* ui: modal content */}
      <div className="form-modal__content form-modal__content--confirm">
        {/* ui: close button */}
        <button
          className="form-modal__close"
          type="button"
          onClick={onClose}
          aria-label="Close modal"
        >
          <img src={closeIcon} alt="" className="form-modal__close-icon" />
        </button>

        {/* ui: title + subtitle */}
        <h2 className="form-modal__title form-modal__title--center">
          Are you sure you want to delete this item?
          <span className="form-modal__subtitle">
            This action is irreversible.
          </span>
        </h2>

        {/* ui: action buttons */}
        <div className="form-modal__actions form-modal__actions--stack">
          <button
            type="button"
            className="form-modal__link-danger"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Deleting…" : "Yes, delete item"}
          </button>

          <button
            type="button"
            className="form-modal__alt form-modal__alt--dark"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
