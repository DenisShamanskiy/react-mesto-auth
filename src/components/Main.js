import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  cards,
  editAvatar,
  editProfile,
  addPlace,
  onClickCard,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile page__container">
        <div
          className="profile__avatar"
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
          onClick={editAvatar}
        ></div>
        <div className="profile__info">
          <div className="profile__description">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              aria-label="Редактировать"
              className="profile__button-edit"
              onClick={editProfile}
            ></button>
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          type="button"
          aria-label="Добавить"
          className="profile__button-add-image"
          onClick={addPlace}
        >
          {" "}
        </button>
      </section>

      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onClickCard={onClickCard}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
