// src/components/EditProfileModal/EditProfileModal.jsx
import React, { useEffect, useMemo, useState, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

// component: edit profile modal
export default function EditProfileModal({
  isOpen,
  onClose,
  onUpdate,
  isLoading = false,
}) {
  // state: current user context
  const currentUser = useContext(CurrentUserContext);

  // state: form fields
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [touched, setTouched] = useState({ name: false, avatar: false });
  const [submitted, setSubmitted] = useState(false);

  // effect: load user data when modal opens
  useEffect(() => {
    if (isOpen) {
      setName(currentUser?.name || "");
      setAvatar(currentUser?.avatar || "");
      setTouched({ name: false, avatar: false });
      setSubmitted(false);
    }
  }, [isOpen, currentUser]);

  // validation: name
  const nameValid = useMemo(() => {
    if (name.length === 0) return false;
    return name.trim().length > 0;
  }, [name]);

  // validation: avatar url
  const avatarValid = useMemo(() => {
    if (avatar.length === 0) return false;
    try {
      const u = new URL(avatar);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  }, [avatar]);

  const canSubmit = nameValid && avatarValid && !isLoading;

  // validation: error flags
  const showNameError =
    (!nameValid && (touched.name || submitted)) || (submitted && !nameValid);

  const showAvatarError =
    (!avatarValid && (touched.avatar || submitted)) ||
    (submitted && !avatarValid);

  // handler: submit form
  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (!canSubmit) return;
    onUpdate({ name: name.trim(), avatar: avatar.trim() });
  };

  // early exit: closed modal
  if (!isOpen) return null;

  // ui: modal
  return (
    <ModalWithForm
      title="Change profile data"
      name="edit"
      onClose={onClose}
      onSubmit={onSubmit}
    >
      {/* ui: name field */}
      <label
        className={"form-modal__label" + (showNameError ? " is-invalid" : "")}
      >
        Name
        <input
          className="form-modal__input"
          name="name"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, name: true }))}
          aria-invalid={showNameError ? "true" : "false"}
          required
          autoComplete="name"
        />
        {showNameError && (
          <span className="form-modal__error">Please enter your name</span>
        )}
      </label>

      {/* ui: avatar field */}
      <label
        className={"form-modal__label" + (showAvatarError ? " is-invalid" : "")}
      >
        Avatar URL
        <input
          className="form-modal__input"
          name="avatar"
          type="url"
          placeholder="https://example.com/avatar.jpg"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, avatar: true }))}
          aria-invalid={showAvatarError ? "true" : "false"}
          required
          autoComplete="url"
        />
        {showAvatarError && (
          <span className="form-modal__error">
            Please enter a valid http(s) URL
          </span>
        )}
      </label>

      {/* ui: actions */}
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
            fontFamily: '"Cabinet Grotesk", sans-serif',
          }}
        >
          {isLoading ? "Saving..." : "Save changes"}
        </button>

        <button
          type="button"
          className="form-modal__alt"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </button>
      </div>
    </ModalWithForm>
  );
}
