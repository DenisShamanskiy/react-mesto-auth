import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function InfoToolTip({ isOpen, isSuccess, onClose, isToolTipForm }) {
  return (
    <PopupWithForm
      title={
        isSuccess
          ? "Вы успешно зарегистрировались!"
          : "Что-то пошло не так! Попробуйте еще раз."
      }
      name="infoToolTip"
      isOpen={isOpen}
      onClose={onClose}
      isToolTipForm={isToolTipForm}
      isSuccess={isSuccess}
    ></PopupWithForm>
  );
}

export default InfoToolTip;
