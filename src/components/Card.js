import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onClickCard, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardDeleteButtonClassName = `elements__button-remove ${
    isOwn ? "elements__button-remove_visible" : "elements__button-remove_hidden"
  }`;

  const cardLikeButtonClassName = isLiked
    ? "elements__button-like elements__button-like_active"
    : "elements__button-like";

  function handleClick() {
    onClickCard(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="elements__item">
      <img
        className="elements__image"
        src={`${card.link}`}
        alt={`${card.name}`}
        onClick={handleClick}
      />
      <button
        type="button"
        aria-label="Удалить"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
      <div className="elements__description">
        <h2 className="elements__name">{card.name}</h2>
        <div className="elements__like-container">
          <button
            type="button"
            aria-label="Нравится"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <div className="elements__like-counter">{card.likes.length}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
