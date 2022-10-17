import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import MoviesHeader from "../MoviesHeader/MoviesHeader";
import * as MainApi from "../../utils/MainApi";
import "./Profile.css";
import { useContext } from "react";
import { useEffect } from "react";

const Profile = ({ modal, handleLogout, handleLogoutMovie }) => {
  const [visible, setVisible] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newUser, setNewUser] = useState([]);

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(name, email);
  };

  const updateProfile = (name, email) => {
    MainApi.patchUserMe(name, email)
      .then(() => {
        setNewUser(newUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main className='profile'>
      <MoviesHeader />
      <div className='profile__container'>
        <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
        <form className='form' onSubmit={handleSubmit}>
          <fieldset className='fieldset profile__fieldset'>
            <label className='profile__span'>Имя</label>
            <input
              className='input profile__input'
              id='name'
              type='text'
              name='name'
              minLength='2'
              maxLength='40'
              required
              autoComplete='off'
              onChange={handleChangeName}
              value={name || ""}
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
              onChange={handleChangeEmail}
              value={email || ""}
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
          <button className='profile__logout' onClick={handleLogout}>
            Выйти из аккаунта
          </button>
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
          <button className='button profile__button' onClick={handleSubmit}>
            <span className='profile__button-span'>Сохранить</span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default Profile;
