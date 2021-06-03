import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function SignForm({ title, name, buttonSubmitText, onSubmit }) {
  const location = useLocation();
  const isLocationSignUp = location.pathname === "/sign-up";

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
  }, []);

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

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit({ email, password });
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

  return (
    <div className="auth page__container">
      <h2 className="title title_place_auth">{title}</h2>

      <form
        className="form"
        name={`form-edit-${name}`}
        onSubmit={handleSubmit}
        noValidate
      >
        <fieldset className="form__fieldset">
          <label className="form__label">
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              className={`form__input form__input_type_auth ${
                emailValidationMessage ? "form__input_type_error" : ""
              }`}
              required
              minLength="6"
              maxLength="40"
              onChange={handleEmail}
            />
            <span
              className={`form__input-error ${
                emailValidationMessage ? "form__input-error_active" : ""
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
              className={`form__input form__input_type_auth ${
                passwordValidationMessage ? "form__input_type_error" : ""
              }`}
              required
              minLength="6"
              maxLength="40"
              onChange={handlePassword}
            />
            <span
              className={`form__input-error ${
                passwordValidationMessage ? "form__input-error_active" : ""
              }`}
            >
              {passwordValidationMessage}
            </span>
          </label>
        </fieldset>

        {
          <button
            type="submit"
            className={`form__button-submit form__button-submit_type_auth ${
              !isFormValid ? "form__button-submit_inactive" : ""
            }`}
            disabled={!isFormValid}
          >
            {buttonSubmitText}
          </button>
        }
        {isLocationSignUp && (
          <div className="form__auth-container">
            <p className="form__auth-text">Уже зарегистрированы?&nbsp;</p>
            <Link className="form__auth-link" to={"/sign-in"}>
              Войти
            </Link>
          </div>
        )}
      </form>
    </div>
  );
}

export default SignForm;
