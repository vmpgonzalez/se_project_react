// src/components/RegisterModal/RegisterModal.jsx
import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

// component: register modal
function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  onSwitchToLogin,
  isLoading = false,
}) {
  // state: form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  // state: touched fields
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    name: false,
    avatar: false,
  });

  // effect: reset form when opened
  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setName("");
      setAvatar("");
      setTouched({
        email: false,
        password: false,
        name: false,
        avatar: false,
      });
    }
  }, [isOpen]);

  // validation: rules
  const emailValid = /\S+@\S+\.\S+/.test(email.trim());
  const passwordValid = password.trim().length >= 6;
  const nameValid = name.trim().length > 0;
  const avatarValid = /^https?:\/\/.+/i.test(avatar.trim());
  const isValid = emailValid && passwordValid && nameValid && avatarValid;

  // validation: error flags
  const showEmailErr = touched.email && !emailValid;
  const showPasswordErr = touched.password && !passwordValid;
  const showNameErr = touched.name && !nameValid;
  const showAvatarErr = touched.avatar && !avatarValid;

  const handleBlur = (field) => setTouched((t) => ({ ...t, [field]: true }));

  // handler: submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid || isLoading) return;

    onRegister({
      name: name.trim(),
      avatar: avatar.trim(),
      email: email.trim(),
      password,
    });
  };

  // guard: closed modal
  if (!isOpen) return null;

  // ui: modal layout
  return (
    <ModalWithForm
      name="register"
      title="Sign Up"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      {/* ui: email input */}
      <label
        className={`form-modal__label ${showEmailErr ? "is-invalid" : ""}`}
      >
        Email*
        <input
          className="form-modal__input"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => handleBlur("email")}
          aria-invalid={showEmailErr ? "true" : "false"}
          autoComplete="email"
          required
        />
        {showEmailErr && (
          <span className="form-modal__error">Enter a valid email.</span>
        )}
      </label>

      {/* ui: password input */}
      <label
        className={`form-modal__label ${showPasswordErr ? "is-invalid" : ""}`}
      >
        Password*
        <input
          className="form-modal__input"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => handleBlur("password")}
          aria-invalid={showPasswordErr ? "true" : "false"}
          autoComplete="new-password"
          required
          minLength={6}
        />
        {showPasswordErr && (
          <span className="form-modal__error">At least 6 characters.</span>
        )}
      </label>

      {/* ui: name input */}
      <label className={`form-modal__label ${showNameErr ? "is-invalid" : ""}`}>
        Name*
        <input
          className="form-modal__input"
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => handleBlur("name")}
          aria-invalid={showNameErr ? "true" : "false"}
          autoComplete="name"
          required
        />
        {showNameErr && (
          <span className="form-modal__error">Name is required.</span>
        )}
      </label>

      {/* ui: avatar url */}
      <label
        className={`form-modal__label ${showAvatarErr ? "is-invalid" : ""}`}
      >
        Avatar URL*
        <input
          className="form-modal__input"
          type="url"
          name="avatar"
          placeholder="Avatar URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          onBlur={() => handleBlur("avatar")}
          aria-invalid={showAvatarErr ? "true" : "false"}
          autoComplete="url"
          required
        />
        {showAvatarErr && (
          <span className="form-modal__error">Enter a valid http(s) URL.</span>
        )}
      </label>

      {/* ui: action buttons */}
      <div className="form-modal__actions">
        <button
          type="submit"
          className="form-modal__submit"
          disabled={!isValid || isLoading}
        >
          {isLoading ? "Signing up…" : "Sign Up"}
        </button>

        <button
          type="button"
          className="form-modal__alt"
          onClick={() => {
            onClose();
            onSwitchToLogin && onSwitchToLogin();
          }}
          disabled={isLoading}
        >
          or Log In
        </button>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
