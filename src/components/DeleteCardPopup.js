import React from "react";

import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({
  isOpen,
  onClose,
  card,
  onSubmitDelete,
  isLoadingData,
}) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmitDelete(card);
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="remove"
      buttonSubmitText="Да"
      loadingButtonSubmitText="Удаление..."
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoadingData={isLoadingData}
      isFormValid="true"
    ></PopupWithForm>
  );
}

export default DeleteCardPopup;
