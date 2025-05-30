import React, { useEffect } from "react";
import "./ModalWithForm.css";
import closeIcon from "../../assets/close-button-grey.png";

function ModalWithForm({
  name,
  title,
  buttonText,
  onClose,
  onSubmit,
  children,
}) {
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

  return (
    <div className={`form-modal form-modal_type_${name}`}>
      <div className="form-modal__overlay" onClick={onClose}></div>

      <div className="form-modal__content">
        <button
          className="form-modal__close"
          type="button"
          onClick={onClose}
          aria-label="Close modal"
        >
          <img src={closeIcon} alt="Close" className="form-modal__close-icon" />
        </button>

        <h2 className="form-modal__title">{title}</h2>

        <form className="form-modal__form" name={name} onSubmit={onSubmit}>
          {children}
          <button type="submit" className="form-modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
