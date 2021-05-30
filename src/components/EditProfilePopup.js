import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoadingData }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState("Name");
  const [description, setDescription] = useState("About");

  const [inputValidName, setInputValidName] = useState(true);
  const [inputValidDescription, setInputValidDescription] = useState(true);
  const [nameValidationMessage, setNameValidationMessage] = useState("");
  const [descriptionValidationMessage, setDescriptionValidationMessage] =
    useState("");
  const [isFormValid, setFormValid] = useState(false);

  useEffect(() => {
    if (currentUser.name && currentUser.about) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
    setInputValidName(true);
    setInputValidDescription(true);
  }, [currentUser, isOpen]);

  function handleName(evt) {
    setName(evt.target.value);
    setInputValidName(evt.target.validity.valid);
    setNameValidationMessage(evt.target.validationMessage);
  }

  function handleDescription(evt) {
    setDescription(evt.target.value);
    setInputValidDescription(evt.target.validity.valid);
    setDescriptionValidationMessage(evt.target.validationMessage);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  useEffect(() => {
    if (inputValidName && inputValidDescription) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [inputValidName, inputValidDescription]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="user"
      buttonSubmitText="Сохранить"
      isFormValid={isFormValid}
      loadingButtonSubmitText="Загрузка..."
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      contentLabel="Форма редактирования имени пользователя"
      isLoadingData={isLoadingData}
    >
      <fieldset className="popup__fieldset">
        <label className="popup__label">
          <input
            type="text"
            name="name"
            placeholder="Имя"
            className={`popup__input ${
              !inputValidName ? "popup__input_type_error" : ""
            }`}
            required
            minLength="2"
            maxLength="40"
            value={name}
            onChange={handleName}
          />
          <span
            className={`popup__input-error ${
              !inputValidName ? "popup__input-error_active" : ""
            }`}
          >
            {nameValidationMessage}
          </span>
        </label>
        <label className="popup__field">
          <input
            type="text"
            name="about"
            placeholder="Что-то о себе"
            className={`popup__input ${
              !inputValidDescription ? "popup__input_type_error" : ""
            }`}
            required
            minLength="2"
            maxLength="200"
            value={description}
            onChange={handleDescription}
          />
          <span
            className={`popup__input-error ${
              !inputValidDescription ? "popup__input-error_active" : ""
            }`}
          >
            {descriptionValidationMessage}
          </span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
