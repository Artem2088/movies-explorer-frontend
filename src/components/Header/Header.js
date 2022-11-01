import { React, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [color, setColor] = useState(true);

  const colorChange = () => {
    if (Link === "/") {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  return (
    <header
      className={`${color ? "header-logout" : "header"} `}
      onChange={colorChange}
    >
      <Link to={"/"}>
        <div className='logo'></div>
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
