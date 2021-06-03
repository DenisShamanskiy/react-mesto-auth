import React, { memo } from "react";
const Footer = memo(({ isLoggedIn }) => {
  return (
    isLoggedIn && (
      <footer className="footer page__container">
        <p className="footer__copyright">&copy; 2021 Mesto Russia</p>
      </footer>
    )
  );
});

export default Footer;
