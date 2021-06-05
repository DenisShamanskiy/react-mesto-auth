import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import "../index.css";
import Header from "./Header.js";
import Login from "./Login.js";
import Register from "./Register.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import DeleteCardPopup from "./DeleteCardPopup.js";
import ImagePopup from "./ImagePopup.js";
import InfoToolTip from "./InfoToolTip";

import ProtectedRoute from "./ProtectedRoute.js";
import api from "../utils/api.js";
import auth from "../utils/auth.js";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isInfoToolTipPopupOpen, setInfoToolTipPopupOpen] = useState(false);

  const [isSuccessInfoToolTip, setIsSuccessInfoToolTip] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [cards, setCards] = useState([]);
  const [cardForDelete, setCardForDelete] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isLoadingSetUserInfo, setIsLoadingSetUserInfo] = useState(false);
  const [isLoadingAvatarUpdate, setIsLoadingAvatarUpdate] = useState(false);
  const [isLoadingAddPlaceSubmit, setIsLoadingAddPlaceSubmit] = useState(false);
  const [isLoadingDeleteCard, setIsLoadingDeleteCard] = useState(false);
  const history = useHistory();

  useEffect(() => {
    handleCheckToken();
    setIsSuccessInfoToolTip(false);
  }, []);

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

  function closeInfoToolTipPopup() {
    closeAllPopups();
    if (isSuccessInfoToolTip) {
      handleLogin({ email: userEmail, password: userPassword });
    }
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setInfoToolTipPopupOpen(false);
    setSelectedCard({});
    setCardForDelete({});
  }

  function handleCheckToken() {
    setIsLoading(true);
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setUserEmail(res.data.email);
          setIsLoggedIn(true);
          setIsLoading(false);
          history.push("/");
        })
        .catch(() => {
          setIsSuccessInfoToolTip(false);
          setInfoToolTipPopupOpen(true);
        });
    } else {
      setIsLoading(false);
      return;
    }
  }

  function handleRegister(data) {
    auth
      .register(data)
      .then((res) => {
        setUserEmail(res.data.email);
        setUserPassword(data.password);
        setIsSuccessInfoToolTip(true);
        setInfoToolTipPopupOpen(true);
      })
      .catch(() => {
        setIsSuccessInfoToolTip(false);
        setInfoToolTipPopupOpen(true);
      });
  }

  function handleLogin(data) {
    auth
      .login(data)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        handleCheckToken();
      })
      .catch(() => {
        setIsSuccessInfoToolTip(false);
        setInfoToolTipPopupOpen(true);
      });
  }

  function handleSignOut() {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    history.push("/sign-in");
    setUserEmail("");
    setUserPassword("");
    setIsSuccessInfoToolTip(null);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          isLoggedIn={isLoggedIn}
          userEmail={userEmail}
          onSignOut={handleSignOut}
          isLoading={isLoading}
        />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            isLoggedIn={isLoggedIn}
            editProfile={handleEditProfileClick}
            addPlace={handleAddPlaceClick}
            editAvatar={handleEditAvatarClick}
            onClickCard={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={confirmCardDelete}
          />
          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={handleLogin} isLoading={isLoading} />
          </Route>

          <Route>
            <Redirect to={!isLoggedIn ? "/sign-in" : "/"} />
          </Route>
        </Switch>
        <Footer isLoggedIn={isLoggedIn} />

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

        <InfoToolTip
          isOpen={isInfoToolTipPopupOpen}
          onClose={closeInfoToolTipPopup}
          isSuccess={isSuccessInfoToolTip}
          isToolTipForm={true}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
