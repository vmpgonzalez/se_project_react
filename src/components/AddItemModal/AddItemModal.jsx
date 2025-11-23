// src/components/AddItemModal/AddItemModal.jsx
import React, { useEffect, useMemo, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ isOpen, onCloseModal, onAddItem, isLoading = false }) {
  // state: form inputs + touched
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [weather, setWeather] = useState("");
  const [touched, setTouched] = useState({
    name: false,
    link: false,
    weather: false,
  });
  const [submitted, setSubmitted] = useState(false);

  // effect: reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setName("");
      setLink("");
      setWeather("");
      setTouched({ name: false, link: false, weather: false });
      setSubmitted(false);
    }
  }, [isOpen]);

  // validation: name field
  const nameValid = useMemo(
    () => (name.length === 0 ? true : name.trim().length > 0),
    [name]
  );

  // validation: image url
  const urlValid = useMemo(() => {
    if (link.length === 0) return true;
    try {
      const u = new URL(link);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  }, [link]);

  // validation: weather choice
  const weatherValid = useMemo(
    () =>
      weather.length === 0 ? false : ["hot", "warm", "cold"].includes(weather),
    [weather]
  );

  const canSubmit =
    name.trim().length > 0 && urlValid && weatherValid && !isLoading;

  // validation: error flags
  const showNameError =
    (!nameValid && name.length > 0) || (submitted && name.trim().length === 0);
  const showUrlError =
    (!urlValid && link.length > 0) || (submitted && !urlValid);
  const showWeatherError = (submitted || touched.weather) && !weatherValid;

  // submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (!canSubmit) return;
    onAddItem({ name: name.trim(), link: link.trim(), weather });
  };

  if (!isOpen) return null;

  // ui: modal + form
  return (
    <ModalWithForm
      name="add"
      title="New garment"
      onClose={onCloseModal}
      onSubmit={handleSubmit}
    >
      {/* ui: name input */}
      <label
        className={`form-modal__label${showNameError ? " is-invalid" : ""}`}
      >
        Name
        <input
          className="form-modal__input"
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, name: true }))}
          aria-invalid={showNameError ? "true" : "false"}
          autoComplete="off"
          required
        />
        {showNameError && (
          <span className="form-modal__error">Please enter a name</span>
        )}
      </label>

      {/* ui: image url input */}
      <label
        className={`form-modal__label${showUrlError ? " is-invalid" : ""}`}
      >
        Image
        <input
          className="form-modal__input"
          type="url"
          name="link"
          placeholder="Image URL"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, link: true }))}
          aria-invalid={showUrlError ? "true" : "false"}
          autoComplete="url"
          required
        />
        {showUrlError && (
          <span className="form-modal__error">
            Please enter a valid URL (http/https)
          </span>
        )}
      </label>

      {/* ui: weather radios */}
      <fieldset
        className={`form-modal__label${showWeatherError ? " is-invalid" : ""}`}
        style={{ border: "none", padding: 0, margin: 0 }}
      >
        Select the weather type:
        <div
          className="modal__radio-group"
          style={{ display: "flex", gap: 16, marginTop: 8 }}
        >
          <label>
            <input
              type="radio"
              name="weather"
              value="hot"
              checked={weather === "hot"}
              onChange={(e) => setWeather(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, weather: true }))}
            />{" "}
            Hot
          </label>
          <label>
            <input
              type="radio"
              name="weather"
              value="warm"
              checked={weather === "warm"}
              onChange={(e) => setWeather(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, weather: true }))}
            />{" "}
            Warm
          </label>
          <label>
            <input
              type="radio"
              name="weather"
              value="cold"
              checked={weather === "cold"}
              onChange={(e) => setWeather(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, weather: true }))}
            />{" "}
            Cold
          </label>
        </div>
        {showWeatherError && (
          <span className="form-modal__error">
            Please choose a weather type
          </span>
        )}
      </fieldset>

      {/* ui: action buttons */}
      <div className="form-modal__actions">
        <button
          type="submit"
          className="form-modal__submit"
          disabled={!canSubmit}
          aria-disabled={!canSubmit}
          style={{
            background: canSubmit ? "#000000" : "#0000004D",
            color: "#ffffff",
            borderRadius: 8,
          }}
        >
          {isLoading ? "Adding…" : "Add garment"}
        </button>

        <button
          type="button"
          className="form-modal__alt"
          onClick={onCloseModal}
          disabled={isLoading}
        >
          Cancel
        </button>
      </div>
    </ModalWithForm>
  );
}

export default AddItemModal;
