function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_type_image ${card.link ? "popup_opened" : ""}`}
    >
      <div className="popup__container">
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__button-close"
          onClick={onClose}
        ></button>
        <figure className="popup__figure">
          <img
            className="popup__photo"
            src={`${card.link}`}
            alt={`${card.name}`}
          />
          <div className="popup__caption">{card.name}</div>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
