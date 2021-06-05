import React, { useState } from "react";
import headerLogo from "../images/header__logo.svg";
import { NavLink, useLocation } from "react-router-dom";

function Header({ isLoggedIn, userEmail, onSignOut, isLoading }) {
  const location = useLocation();
  const isLocationSignIn = location.pathname === "/sign-in";
  const isLocationMain = location.pathname === "/";
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  function handleSignIn() {}

  function handleSignOut() {
    onSignOut();
    setMenuIsOpen(false);
  }

  function handleToggleMenu() {
    setMenuIsOpen(!menuIsOpen);
  }

  return (
    <header
      className={`header ${!menuIsOpen ? "page__container" : ""} ${
        menuIsOpen ? "header_columned" : ""
      }`}
    >
      <div
        className={`header__logo-container ${
          menuIsOpen ? "header__logo-container_type_column" : ""
        }`}
      >
        <img className="header__logo" src={headerLogo} alt="Логотип" />
        <button
          onClick={handleToggleMenu}
          type="button"
          aria-label="Закрыть меню"
          className={`button-close button-close_place_header ${
            menuIsOpen ? "button-close_active" : ""
          }`}
        ></button>
      </div>

      <div
        onClick={handleToggleMenu}
        className={`header__button-menu ${
          !isLoggedIn || menuIsOpen ? "header__button-menu_type_inactive" : ""
        }`}
      >
        <div className="header__burger-line"></div>
        <div className="header__burger-line"></div>
        <div className="header__burger-line"></div>
      </div>
      {!isLoading && (
        <nav
          className={`header__nav-container ${
            isLoggedIn && !menuIsOpen
              ? "header__nav-container_type_inactive"
              : ""
          } ${menuIsOpen ? "header__nav-container_type_column" : ""} `}
        >
          <p className="header__email-user">{isLoggedIn ? userEmail : ""}</p>
          {!isLocationSignIn ? (
            <NavLink
              onClick={!isLoggedIn ? handleSignIn : handleSignOut}
              className={`header__nav-item ${
                isLocationMain ? "header__nav-item_active" : ""
              }`}
              to={"/sign-in"}
            >
              {isLoggedIn ? "Выйти" : "Войти"}
            </NavLink>
          ) : (
            <NavLink
              className="header__nav-item"
              activeClassName="header_nav-item_active"
              to={"/sign-up"}
            >
              {!isLoggedIn ? "Регистрация" : ""}
            </NavLink>
          )}
        </nav>
      )}
    </header>
  );
}

export default Header;
