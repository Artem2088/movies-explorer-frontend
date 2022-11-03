import { React, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import iconLogo from "../../images/icon/button-icon-main.svg";
import "./MoviesHeader.css";
import { useEffect } from "react";

const MoviesHeader = () => {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname == "/") {
      setColor(true);
    } else {
      setColor(false);
    }
  }, [pathname]);

  return (
    <header className={!color ? "header" : "header-movies"}>
      <Link to={"/"}>
        <div className='logo'></div>
      </Link>
      <nav className='header-movies__container'>
        <li>
          <NavLink
            to='/movies'
            className={
              !color
                ? "header-movies__link navigation__link"
                : "header-movies__link_main"
            }
          >
            Фильмы
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/saved-movies'
            className={
              !color
                ? "header-movies__link navigation__link"
                : "header-movies__link_main"
            }
          >
            Сохранённые фильмы
          </NavLink>
        </li>
        <Link to={"/profile"}>
          <button
            className={
              !color ? "header-movies__button" : "header-movies__button_main"
            }
            type='submit'
          >
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
