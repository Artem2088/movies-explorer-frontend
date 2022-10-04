import React from "react";
// import Modal from "../Modal/Modal";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className='login'>
      <div className='login__container'>
        <Link to={"/"}>
          <div className='logo'></div>
        </Link>
        <h2 className='register__title login__title'>Рады видеть!</h2>
      </div>
      <form className='form'>
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
          />
          <span className='register__error login__error_password'>
            Что-то пошло не так...
          </span>
        </fieldset>
      </form>
      <button className='button login__button' type='submit'>
        <span className='login__span'> Войти</span>
      </button>
      <p className='register__description login__description'>
        Ещё не зарегистрированы?
        <Link className='button login__button_enter' to='/signup'>
          Регистрация
        </Link>
      </p>
      {/* <Modal /> */}
    </div>
  );
};

export default Login;
