import React from "react";

function PopupWithForm({
  title,
  name,
  buttonSubmitText,
  loadingButtonSubmitText,
  isLoadingData,
  children,
  isOpen,
  onClose,
  onSubmit,
  isFormValid,
}) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_form">
        <h2 className="popup__title">{title}</h2>
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__button-close"
          onClick={onClose}
        ></button>
        <form
          className="popup__form"
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button
            type="submit"
            className={`popup__button-save ${
              !isFormValid ? "popup__button-save_inactive" : ""
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
