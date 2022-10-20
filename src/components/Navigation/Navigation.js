import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navigation.css";
import iconLogo from "../../images/icon/button-icon-main.svg";

const Navigation = () => {
  return (
    <div className='navigation'>
      <div className='navigation-links__container '>
        <nav className='navigation__link-blok'>
          <li>
            <NavLink to='/' className='navigation__link' end>
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink to='/movies' className='navigation__link'>
              Фильмы
            </NavLink>
          </li>
          <li>
            <NavLink to='/saved-movies' className='navigation__link'>
              Сохранённые фильмы
            </NavLink>
          </li>
        </nav>
        <Link to='/profile' className='navigation__link-btn'>
          <button
            className='header-movies__button  navigation__button'
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
      </div>
      <div className='navigation__cover'></div>
    </div>
  );
};

export default Navigation;
