import React from "react";
import { Link } from "react-router-dom";
import movieLogo from "../../images/icon/logo-circle.svg";
import iconLogo from "../../images/icon/button-icon-main.svg";
import "./MoviesHeader.css";

const MoviesHeader = () => {
  return (
    <header className='header header-movies'>
      <Link to={"/"}>
        <img src={movieLogo} alt='логотип' className='header__logo-movies' />
      </Link>
      <div className='header__container header__container-movies'>
        <Link to={"/movies"} className='header__link-movies'>
          Фильмы
        </Link>
        <Link to={"/saved-movies"} className='header__link-movies'>
          Сохранённые фильмы
        </Link>
        <Link to={"/signin"}>
          <button className='header__button-movies' type='submit'>
            <img
              src={iconLogo}
              alt='иконка-юзера'
              className='header__button-movies_icon'
            />
            Аккаунт
          </button>
        </Link>
      </div>
    </header>
  );
};

export default MoviesHeader;
