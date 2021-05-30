import header__logo from "../images/header__logo.svg";

function Header() {
  return (
    <header className="header page__container">
      <img className="header__logo" src={header__logo} alt="Логотип" />
    </header>
  );
}

export default Header;
