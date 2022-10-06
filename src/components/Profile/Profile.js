import React from "react";
// import Modal from "../Modal/Modal";
import { useState } from "react";
import { Link } from "react-router-dom";
import MoviesHeader from "../MoviesHeader/MoviesHeader";
import "./Profile.css";

const Profile = () => {
  const [visible, setVisible] = useState(false);

  return (
    <main className='profile'>
      <MoviesHeader />
      <div className='profile__container'>
        <h2 className='profile__title'>Привет, Артем!</h2>
        <form className='form'>
          <fieldset className='fieldset profile__fieldset'>
            <label className='profile__span'>Имя</label>
            <input
              className='input profile__input'
              id='name'
              type='text'
              name='Email'
              minLength='2'
              maxLength='40'
              required
              autoComplete='off'
              value={"Артем"}
            />
            <label className='profile__span_mail'>E-mail</label>
            <input
              className='input profile__input'
              id='email'
              type='email'
              name='Email'
              minLength='2'
              maxLength='40'
              required
              autoComplete='off'
              value={"pochta@yandex.ru"}
            />
          </fieldset>
        </form>
        <div
          className={`${
            visible ? "profile__block_unactiv" : "profile__block "
          }`}
        >
          <button className='profile__redact' onClick={() => setVisible(true)}>
            Редактировать
          </button>
          <Link to={"/"} className='profile__logout'>
            Выйти из аккаунта
          </Link>
        </div>
        <div
          className={`${
            visible
              ? "profile__botom-container_activ"
              : "profile__botom-container "
          }`}
        >
          <span className='profile__error-span'>
            При обновлении профиля произошла ошибка.
          </span>
          <button
            className='button profile__button'
            onClick={() => setVisible(false)}
          >
            <span className='profile__button-span'>Сохранить</span>
          </button>
        </div>
      </div>
      {/* <Modal /> */}
    </main>
  );
};

export default Profile;
