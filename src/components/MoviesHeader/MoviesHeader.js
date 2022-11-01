import { React, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import iconLogo from "../../images/icon/button-icon-main.svg";
import "./MoviesHeader.css";

const MoviesHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className='header header-movies'>
      <Link to={"/"}>
        <div className='logo'></div>
      </Link>
      <nav className='header-movies__container'>
        <li>
          <NavLink
            to='/movies'
            className='header-movies__link navigation__link'
          >
            Фильмы
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/saved-movies'
            className='header-movies__link navigation__link'
          >
            Сохранённые фильмы
          </NavLink>
        </li>
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
      </nav>
      <div
        onClick={() => setOpen(!open)}
        className={`${
          open ? "header-movies__btn-activ" : "header-movies__btn"
        }`}
      >
        {open ? <AiOutlineClose size={44} /> : <AiOutlineMenu size={44} />}
      </div>
      {open ? <Navigation /> : ""}
    </header>
  );
};

export default MoviesHeader;
