import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className='footer'>
      <p className='footer__about'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className='footer__bottom-block'>
        <p className='footer__copyright'>&copy; 2022</p>
        <ul className='footer__block-links'>
          <li>
            <a href='https://practicum.yandex.ru/' className='footer__link'>
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a href='https://github.com/Artem2088' className='footer__link'>
              Github
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
