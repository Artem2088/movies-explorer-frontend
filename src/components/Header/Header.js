import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className='header'>
      <Link to={"/"}>
        <div className='logo header__logo'></div>
      </Link>
      <div className='header__container'>
        <Link to={"/signup"} className='header__link'>
          Регистрация
        </Link>
        <Link to={"/signin"}>
          <button className='button header__button'>
            <span className='header__span'>Войти</span>
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
