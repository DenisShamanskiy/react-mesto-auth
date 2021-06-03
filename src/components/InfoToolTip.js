import React from "react";

function InfoToolTip({ isOpen, isSuccess, onClose }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_form">
        <div
          className={`popup__tooltip-image ${
            !isSuccess ? "popup__tooltip-image_type_fail" : ""
          }`}
        ></div>
        <h2 className="title title_place_auth">
          {!isSuccess
            ? "Что-то пошло не так! Попробуйте еще раз."
            : "Вы успешно зарегистрировались!"}
        </h2>
        <button
          type="button"
          aria-label="Закрыть"
          className="button-close button-close_place_tooltip"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoToolTip;
