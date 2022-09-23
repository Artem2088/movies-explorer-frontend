import React from "react";
import { Link } from "react-router-dom";
import headerLogo from "../../images/icon/logo.svg";
import "./Header.css";

const Header = () => {
  return (
    <header className='header'>
      <Link to={"/"}>
        <img src={headerLogo} alt='логотип' className='header__logo' />
      </Link>
      <div className='header__container'>
        <Link to={"/signup"} className='header__link'>
          Регистрация
        </Link>
        <button className='header__button' type='submit'>
          Войти
        </button>
      </div>
    </header>
  );
};

export default Header;
