import React from "react";
import "./AboutMe.css";

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
          Живу в Санкт-Петербурге. Женат, есть дочь. Из увлечений люблю технику
          и все, что с ней связано. С не давних пор, а именно с сентября 2021
          года решил изменить свой образ деятельности и пошел учиться на
          Веб-разработчика в Яндекс-Практикум. На данный момент работаю, но в
          скором времени планирую уйти с основной работы и начать зарабатывать
          на жизнь тем, чем нравится. А именно, созданием и поддержкой сайтов и
          приложений.
        </p>
        <div className='aboutMe__foto'></div>
      </div>
      <a href='https://github.com/Artem2088' className='aboutMe__link'>
        Github
      </a>
      <a href='https://telegram.org/' className='aboutMe__link'>
        Telegram
      </a>
      <a href='https://vk.com/' className='aboutMe__link'>
        Vkontakte
      </a>
    </div>
  );
};

export default AboutMe;
