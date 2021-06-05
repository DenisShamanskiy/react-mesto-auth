import React from "react";

function PopupWithForm({
  title,
  name,
  buttonSubmitText,
  children,
  isOpen,
  onClose,
  onSubmit,
  isFormValid,
  loadingButtonSubmitText,
  isLoadingData,
}) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_form">
        <h2 className="title">{title}</h2>
        <button
          type="button"
          aria-label="Закрыть"
          className="button-close"
          onClick={onClose}
        ></button>
        <form className="form" name={name} onSubmit={onSubmit} noValidate>
          {children}
          <button
            type="submit"
            className={`form__button-submit ${
              !isFormValid ? "form__button-submit_inactive" : ""
            }`}
            disabled={!isFormValid}
          >
            {isLoadingData ? loadingButtonSubmitText : buttonSubmitText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
