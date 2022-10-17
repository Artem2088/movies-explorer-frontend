import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const currentUser = useContext(CurrentUserContext);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className='login'>
      <div className='login__container'>
        <Link to={"/"} className='login__link'>
          <div className='logo'></div>
        </Link>
        <h2 className='register__title login__title'>
          Рады видеть {currentUser.name}!
        </h2>
      </div>
      <form className='form' onSubmit={handleSubmit}>
        <fieldset className='fieldset login__fieldset'>
          <label className='register__label login__label'>E-mail</label>
          <input
            className='input login__input'
            id='email'
            type='email'
            name='Email'
            placeholder='Email'
            minLength='2'
            maxLength='40'
            required
            autoComplete='off'
            onChange={handleEmail}
            value={email}
          />
          <span className='register__error login__error_email'>
            Что-то пошло не так...
          </span>
          <label className='register__label login__label'>Пароль</label>
          <input
            className='input login__input'
            id='password'
            name='password'
            type='password'
            placeholder='Пароль'
            minLength='2'
            maxLength='40'
            required
            autoComplete='on'
            onChange={handlePassword}
            value={password}
          />
          <span className='register__error login__error_password'>
            Что-то пошло не так...
          </span>
        </fieldset>
      </form>
      <button
        className='button login__button'
        type='submit'
        onClick={handleSubmit}
      >
        <span className='login__span'> Войти</span>
      </button>
      <p className='register__description login__description'>
        Ещё не зарегистрированы?
        <Link className='button login__button_enter' to='/signup'>
          Регистрация
        </Link>
      </p>
    </div>
  );
};

export default Login;
