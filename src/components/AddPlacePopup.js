import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoadingData }) {
  const [place, setPlace] = useState("");
  const [link, setLink] = useState("");

  const [placeValidationMessage, setPlaceValidationMessage] = useState("");
  const [linkValidationMessage, setLinkValidationMessage] = useState("");
  const [isFormValid, setFormValid] = useState(false);
  const [placeInputInitial, setPlaceInputInitial] = useState(true);
  const [linkInputInitial, setLinkInputInitial] = useState(true);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({ name: place, link });
  }

  function handlePlace(evt) {
    setPlace(evt.target.value);
    setPlaceInputInitial(false);
    setPlaceValidationMessage(evt.target.validationMessage);
  }

  function handleLink(evt) {
    setLink(evt.target.value);
    setLinkInputInitial(false);
    setLinkValidationMessage(evt.target.validationMessage);
  }

  useEffect(() => {
    setPlace("");
    setLink("");
    setFormValid(false);
    setPlaceInputInitial(true);
    setLinkInputInitial(true);
  }, [isOpen]);

  useEffect(() => {
    if (
      !placeValidationMessage &&
      !linkValidationMessage &&
      !placeInputInitial &&
      !linkInputInitial
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [
    placeInputInitial,
    linkInputInitial,
    placeValidationMessage,
    linkValidationMessage,
    place,
    link,
  ]);

  return (
    <PopupWithForm
      title="Новое место"
      name="place"
      buttonSubmitText="Создать"
      loadingButtonSubmitText="Сохранение..."
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoadingData={isLoadingData}
      isFormValid={isFormValid}
    >
      <fieldset className="form__fieldset">
        <label className="form__label">
          <input
            type="text"
            name="place"
            placeholder="Название"
            className={`form__input ${
              placeValidationMessage ? "form__input_type_error" : ""
            }`}
            required
            minLength="2"
            maxLength="30"
            value={place}
            onChange={handlePlace}
          />
          <span
            className={`form__input-error ${
              placeValidationMessage ? "form__input-error_active" : ""
            }`}
          >
            {placeValidationMessage}
          </span>
        </label>
        <label className="form__label">
          <input
            type="url"
            name="link"
            placeholder="Ссылка на картинку"
            className={`form__input ${
              linkValidationMessage ? "form__input_type_error" : ""
            }`}
            required
            value={link}
            onChange={handleLink}
          />
          <span
            className={`form__input-error ${
              linkValidationMessage ? "form__input-error_active" : ""
            }`}
          >
            {linkValidationMessage}
          </span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
