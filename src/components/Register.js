import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function Register({ isOpen, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailValidationMessage, setEmailValidationMessage] = useState("");
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState("");
  const [isFormValid, setFormValid] = useState(false);
  const [emailInputInitial, setEmailInputInitial] = useState(true);
  const [passwordInputInitial, setPasswordInputInitial] = useState(true);

  useEffect(() => {
    setFormValid(false);
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister({ email, password });
  }

  function handleEmail(evt) {
    setEmail(evt.target.value);
    setEmailInputInitial(false);
    setEmailValidationMessage(evt.target.validationMessage);
  }

  function handlePassword(evt) {
    setPassword(evt.target.value);
    setPasswordInputInitial(false);
    setPasswordValidationMessage(evt.target.validationMessage);
  }

  useEffect(() => {
    if (
      !emailValidationMessage &&
      !passwordValidationMessage &&
      !emailInputInitial &&
      !passwordInputInitial
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [
    emailInputInitial,
    passwordInputInitial,
    emailValidationMessage,
    passwordValidationMessage,
    email,
    password,
  ]);

  useEffect(() => {
    setEmail("");
    setPassword("");
    setFormValid(false);
    setEmailInputInitial(true);
    setPasswordInputInitial(true);
  }, []);

  return (
    <PopupWithForm
      title="Регистрация"
      name="register"
      buttonSubmitText="Зарегистрироваться"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      isAuthForm={true}
    >
      <fieldset className="popup__fieldset">
        <label className="popup__label">
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            className={`popup__input popup__input_type_auth ${
              emailValidationMessage ? "popup__input_type_error" : ""
            }`}
            required
            minLength="6"
            maxLength="40"
            onChange={handleEmail}
          />
          <span
            className={`popup__input-error ${
              emailValidationMessage ? "popup__input-error_active" : ""
            }`}
          >
            {emailValidationMessage}
          </span>
        </label>
        <label className="popup__field">
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Пароль"
            className={`popup__input popup__input_type_auth ${
              passwordValidationMessage ? "popup__input_type_error" : ""
            }`}
            required
            minLength="6"
            maxLength="40"
            onChange={handlePassword}
          />
          <span
            className={`popup__input-error ${
              passwordValidationMessage ? "popup__input-error_active" : ""
            }`}
          >
            {passwordValidationMessage}
          </span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default Register;
