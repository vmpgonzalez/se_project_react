// src/components/ItemModal/ItemModal.jsx
import React, { useEffect, useContext } from "react";
import "./ItemModal.css";
import closeIconGrey from "../../assets/close-button-grey.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

// component: item modal
function ItemModal({ item, onClose, onDelete }) {
  // state: current user
  const currentUser = useContext(CurrentUserContext);

  // effect: close on ESC
  useEffect(() => {
    const handleEsc = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // guard: no item
  if (!item) return null;

  // prep: image + ownership
  const src = item.imageUrl || item.link;
  const isOwn =
    currentUser &&
    (typeof item.owner === "string"
      ? item.owner === currentUser._id
      : item.owner?._id === currentUser._id);

  // ui: modal layout
  return (
    <div className="item-modal" onClick={onClose}>
      {/* ui: overlay */}
      <div className="item-modal__overlay" />

      {/* ui: modal content */}
      <div
        className="item-modal__content"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* ui: close button */}
        <button
          className="item-modal__close"
          type="button"
          aria-label="Close"
          onClick={onClose}
        >
          <img
            src={closeIconGrey}
            alt="Close"
            className="item-modal__close-icon"
          />
        </button>

        {/* ui: image block */}
        <div className="item-modal__image-wrap">
          <img
            src={src}
            alt={item.name}
            className="item-modal__image"
            onError={(event) => {
              event.currentTarget.src =
                "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
              console.warn("Modal image failed to load for", item);
            }}
          />
        </div>

        {/* ui: info section */}
        <div className="item-modal__bar">
          <div className="item-modal__top-row">
            <p className="item-modal__name">{item.name}</p>

            {isOwn && (
              <button
                type="button"
                className="item-modal__delete"
                onClick={() => onDelete(item)}
              >
                Delete item
              </button>
            )}
          </div>

          <p className="item-modal__weather">Weather: {item.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
