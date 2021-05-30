import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/api.js";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [cardForDelete, setCardForDelete] = useState({});
  const [isLoadingSetUserInfo, setIsLoadingSetUserInfo] = useState(false);
  const [isLoadingAvatarUpdate, setIsLoadingAvatarUpdate] = useState(false);
  const [isLoadingAddPlaceSubmit, setIsLoadingAddPlaceSubmit] = useState(false);
  const [isLoadingDeleteCard, setIsLoadingDeleteCard] = useState(false);

  useEffect(() => {
    api
      .getInitialData()
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleUpdateUser(user) {
    setIsLoadingSetUserInfo(true);
    api
      .setUserInfo(user)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingSetUserInfo(false);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoadingAvatarUpdate(true);
    api
      .setUserAvatar(avatar)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingAvatarUpdate(false);
      });
  }

  function handleAddCard(card) {
    setIsLoadingAddPlaceSubmit(true);
    api
      .postCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingAddPlaceSubmit(false);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLike(card, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    setIsLoadingDeleteCard(true);
    api
      .deleteCard(card)
      .then(() => {
        setCards(cards.filter((cardDelete) => cardDelete._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingDeleteCard(false);
      });
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function confirmCardDelete(card) {
    setCardForDelete(card);
    setIsDeleteCardPopupOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard({});
    setCardForDelete({});
  }

  useEffect(() => {
    function handleEscapeClick(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    document.addEventListener("keyup", handleEscapeClick);

    return () => {
      document.removeEventListener("keyup", handleEscapeClick);
    };
  }, []);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          cards={cards}
          editProfile={handleEditProfileClick}
          editAvatar={handleEditAvatarClick}
          addPlace={handleAddPlaceClick}
          onClickCard={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={confirmCardDelete}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          currentUser={currentUser}
          isLoadingData={isLoadingSetUserInfo}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddCard}
          isLoadingData={isLoadingAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoadingData={isLoadingAvatarUpdate}
        />

        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          card={cardForDelete}
          onSubmitDelete={handleCardDelete}
          isLoadingData={isLoadingDeleteCard}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
