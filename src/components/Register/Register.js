import React from "react";
// import Modal from "../Modal/Modal";
import "./Register.css";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className='register'>
      <div className='register__container'>
        <Link to={"/"} className='register__link'>
          <div className='logo'></div>
        </Link>
        <h2 className='register__title'>Добро пожаловать!</h2>
      </div>
      <form className='form'>
        <fieldset className='fieldset register__fieldset'>
          <label className='register__label'>Имя</label>
          <input
            className='input register__input'
            id='name'
            type='text'
            name='Email'
            placeholder='Имя'
            minLength='2'
            maxLength='40'
            required
            autoComplete='off'
          />
          <span className='register__error register__error_name'>
            Что-то пошло не так...
          </span>
          <label className='register__label'>E-mail</label>
          <input
            className='input register__input'
            id='email'
            type='email'
            name='Email'
            placeholder='Email'
            minLength='2'
            maxLength='40'
            required
            autoComplete='off'
          />
          <span className='register__error register__error_email'>
            Что-то пошло не так...
          </span>
          <label className='register__label'>Пароль</label>
          <input
            className='input register__input'
            id='password'
            name='password'
            type='password'
            placeholder='Пароль'
            minLength='2'
            maxLength='40'
            required
            autoComplete='on'
          />
          <span className='register__error register__error_password'>
            Что-то пошло не так...
          </span>
        </fieldset>
      </form>
      <button className='button register__button' type='submit'>
        <span className='register__span'> Зарегестрироваться</span>
      </button>
      <p className='register__description'>
        Уже зарегистрированы?
        <Link className='button register__button_enter' to='/signin'>
          Войти
        </Link>
      </p>
      {/* <Modal /> */}
    </div>
  );
};

export default Register;
