import React from "react";

function ModalWithForm({ name, title, buttonText, onClose, children }) {
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>
          X
        </button>
        <h2>{title}</h2>
        <form name={name}>
          {children}
          <button type="submit">{buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
