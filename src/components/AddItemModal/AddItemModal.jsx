import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ isOpen, onCloseModal, onAddItem }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setLink("");
      setWeather("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, link, weather });
    onCloseModal();
  };

  return (
    <ModalWithForm
      title="New garment"
      name="add"
      buttonText="Add garment"
      onClose={onCloseModal}
      onSubmit={handleSubmit}
    >
      <label className="modal__label modal__label-name">
        Name
        <input
          type="text"
          name="name"
          required
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label className="modal__label modal__label-image">
        Image
        <input
          type="url"
          name="link"
          required
          placeholder="Image URL"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </label>

      <label className="modal__label">
        Select the weather type:
        <div className="modal__radio-group">
          <label>
            <input
              type="radio"
              name="weather"
              value="hot"
              checked={weather === "hot"}
              onChange={(e) => setWeather(e.target.value)}
            />
            Hot
          </label>
          <label>
            <input
              type="radio"
              name="weather"
              value="warm"
              checked={weather === "warm"}
              onChange={(e) => setWeather(e.target.value)}
            />
            Warm
          </label>
          <label>
            <input
              type="radio"
              name="weather"
              value="cold"
              checked={weather === "cold"}
              onChange={(e) => setWeather(e.target.value)}
            />
            Cold
          </label>
        </div>
      </label>
    </ModalWithForm>
  );
}

export default AddItemModal;
