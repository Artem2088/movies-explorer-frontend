import React from "react";
import "./AboutMe.css";
import meFoto from "../../../images/image/697522461.jpeg";

const AboutMe = () => {
  return (
    <div className='aboutMe' id='aboutMe'>
      <div className='aboutMe__header main-header__project'>
        <p className='aboutMe__title main-title__project'>Студент</p>
      </div>
      <div className='aboutMe__block'>
        <h3 className='aboutMe__name'>Артем</h3>
        <p className='aboutMe__hobby'>Фронтенд-разработчик, 34 лет</p>
        <p className='aboutMe__description'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo id illo
          alias ratione pariatur nobis doloribus ipsa enim incidunt vero! Quod
          rem magni ad soluta! Similique harum ipsa adipisci impedit?
        </p>
        <img src={meFoto} alt='Фото студента' className='aboutMe__foto' />
      </div>
      <a href='#' className='aboutMe__link'>
        Github
      </a>
      <a href='#' className='aboutMe__link'>
        Telegram
      </a>
      <a href='#' className='aboutMe__link'>
        Vkontakte
      </a>
    </div>
  );
};

export default AboutMe;
