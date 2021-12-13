import React from "react";
import useCheckAuth from "../../hooks/useCheckAuth";
import AuthlessNav from "../AuthlessNav";
import AuthNav from "../AuthNav";
import "./Header.scss";

const Header = () => {
  const isAuth = useCheckAuth();

  return (
    <header className="header">
      <div className="header__logo">Realworld Blog</div>
      <nav className="header__nav">
        {isAuth ? <AuthNav /> : <AuthlessNav />}
      </nav>
    </header>
  );
};

export default Header;
