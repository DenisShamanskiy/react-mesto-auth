import React from "react";
import { Link, useLocation } from "react-router-dom";

function PopupWithForm({
  title,
  name,
  buttonSubmitText,
  children,
  isOpen,
  onClose,
  onSubmit,
  isFormValid,
  isAuthForm,
  isToolTipForm,
  isSuccess,
  loadingButtonSubmitText,
  isLoadingData,
}) {
  const location = useLocation();
  const isLocationSignUp = location.pathname === "/sign-up";

  return (
    <div
      className={`popup ${isAuthForm ? "popup_type_auth appear" : ""} ${
        isOpen ? "popup_opened" : ""
      }`}
    >
      <div
        className={`popup__container ${
          !isAuthForm
            ? "popup__container_form"
            : "popup__container_auth page__container"
        }`}
      >
        {isToolTipForm && (
          <div
            className={`popup__tooltip-image ${
              !isSuccess ? "popup__tooltip-image_type_fail" : ""
            }`}
          ></div>
        )}
        <h2
          className={`popup__title ${
            isToolTipForm || isAuthForm ? "popup__title_place_auth" : ""
          }`}
        >
          {title}
        </h2>
        {!isAuthForm && (
          <button
            type="button"
            aria-label="Закрыть"
            className={`popup__button-close ${
              isToolTipForm ? "popup__btn-close_place_tooltip" : ""
            }`}
            onClick={onClose}
          ></button>
        )}
        <form
          className="popup__form"
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          {!isToolTipForm && (
            <button
              type="submit"
              className={`popup__button-save ${
                isAuthForm ? "popup__button-save_type_auth" : ""
              } ${!isFormValid ? "popup__button-save_inactive" : ""}`}
              disabled={!isFormValid}
            >
              {isLoadingData ? loadingButtonSubmitText : buttonSubmitText}
            </button>
          )}
          {isLocationSignUp && !isToolTipForm && (
            <div className="popup__auth-container">
              <p className="popup__auth-text">Уже зарегистрированы?&nbsp;</p>
              <Link className="popup__auth-link" to={"/sign-in"}>
                Войти
              </Link>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
