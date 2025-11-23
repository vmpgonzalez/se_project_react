// src/components/ModalWithForm/ModalWithForm.jsx
import React, { useEffect } from "react";
import "./ModalWithForm.css";
import closeIcon from "../../assets/close-button-grey.svg";

// component: modal wrapper
function ModalWithForm({ name, title, onClose, onSubmit, children }) {
  // effect: close on ESC
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [onClose]);

  // ui: modal layout
  return (
    <div
      className={`form-modal form-modal--${name}`}
      role="dialog"
      aria-modal="true"
    >
      {/* ui: overlay */}
      <div className="form-modal__overlay" onClick={onClose} />

      {/* ui: modal content */}
      <div className="form-modal__content">
        {/* ui: close button */}
        <button
          className="form-modal__close"
          type="button"
          onClick={onClose}
          aria-label="Close modal"
        >
          <img src={closeIcon} alt="" className="form-modal__close-icon" />
        </button>

        {/* ui: modal title */}
        <h2 className="form-modal__title">{title}</h2>

        {/* ui: inner form */}
        <form className="form-modal__form" name={name} onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
