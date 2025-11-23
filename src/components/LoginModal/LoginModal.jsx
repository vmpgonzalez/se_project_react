// src/components/LoginModal/LoginModal.jsx
import React, { useMemo, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

// component: login modal
function LoginModal({
  isOpen,
  onClose,
  onLogin,
  isLoading = false,
  onOpenRegister,
  authError,
  onClearAuthError,
}) {
  // state: form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // validation: email
  const emailValid = useMemo(() => {
    if (email.length === 0) return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, [email]);

  // validation: password
  const passwordValid = useMemo(() => {
    if (password.length === 0) return true;
    return password.length >= 6;
  }, [password]);

  // validation: overall submit
  const canSubmit =
    email.length > 0 &&
    password.length > 0 &&
    emailValid &&
    passwordValid &&
    !isLoading;

  // handlers: input updates
  const handleEmail = (e) => {
    setEmail(e.target.value);
    authError && onClearAuthError && onClearAuthError();
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    authError && onClearAuthError && onClearAuthError();
  };

  // handler: form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    onLogin({ email, password });
  };

  // guard: modal closed
  if (!isOpen) return null;

  // validation flags
  const emailInvalid = !emailValid && email.length > 0;
  const passwordInvalid = !passwordValid && password.length > 0;
  const authInvalid = Boolean(authError);

  // ui: modal layout
  return (
    <ModalWithForm
      name="login"
      title="Log In"
      onClose={() => {
        onClose();
        onClearAuthError && onClearAuthError();
      }}
      onSubmit={handleSubmit}
    >
      {/* ui: email field */}
      <label
        className={
          "form-modal__label" +
          (emailInvalid || authInvalid ? " is-invalid" : "")
        }
        style={{ gap: 8 }}
      >
        Email
        <input
          className="form-modal__input"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleEmail}
          autoComplete="email"
          aria-invalid={emailInvalid || authInvalid ? "true" : "false"}
        />
        {emailInvalid && (
          <span className="form-modal__error">This is not a valid email</span>
        )}
      </label>

      {/* ui: password field */}
      <label
        className={
          "form-modal__label" +
          (passwordInvalid || authInvalid ? " is-invalid" : "")
        }
        style={{ gap: 8 }}
      >
        Password
        <input
          className="form-modal__input"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handlePassword}
          autoComplete="current-password"
          aria-invalid={passwordInvalid || authInvalid ? "true" : "false"}
        />
        {passwordInvalid && (
          <span className="form-modal__error">
            Password must be 6+ characters
          </span>
        )}
      </label>

      {/* ui: backend error */}
      {authInvalid && (
        <div
          className="form-modal__error"
          role="alert"
          style={{ marginTop: 4 }}
        >
          {authError || "Email or password incorrect"}
        </div>
      )}

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
            fontFamily: '"Cabinet Grotesk", sans-serif',
            borderRadius: 8,
          }}
        >
          {isLoading ? "Logging in…" : "Log In"}
        </button>

        <button
          type="button"
          className="form-modal__alt"
          onClick={() => {
            onClose();
            onClearAuthError && onClearAuthError();
            onOpenRegister && onOpenRegister();
          }}
          disabled={isLoading}
        >
          or Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
