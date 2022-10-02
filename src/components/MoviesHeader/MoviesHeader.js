import React from "react";
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import iconLogo from "../../images/icon/button-icon-main.svg";
import "./MoviesHeader.css";
import { useState } from "react";

const MoviesHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className='header header-movies'>
      <Link to={"/"}>
        <div className='logo header-movies__logo'></div>
      </Link>
      <div className='header-movies__container'>
        <Link to={"/movies"} className='header-movies__link'>
          Фильмы
        </Link>
        <Link to={"/saved-movies"} className='header-movies__link'>
          Сохранённые фильмы
        </Link>
        <Link to={"/profile"}>
          <button className='header-movies__button' type='submit'>
            <img
              src={iconLogo}
              alt='иконка-юзера'
              className='button header-movies__button_icon'
            />
            Аккаунт
          </button>
        </Link>
      </div>
      <div onClick={() => setOpen(!open)} className='header-movies__btn'>
        {open ? <AiOutlineClose size={44} /> : <AiOutlineMenu size={44} />}
      </div>
      {open ? <Navigation /> : ""}
    </header>
  );
};

export default MoviesHeader;
