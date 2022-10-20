import React from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const currentUser = useContext(CurrentUserContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onTouched" });

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogSubmit = (e) => {
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
      <form
        className='form'
        onSubmit={handleSubmit(handleLogSubmit)}
        noValidate
      >
        <fieldset className='fieldset login__fieldset'>
          <label className='register__label login__label'>E-mail</label>
          <input
            {...register("Email", {
              required: true,
              minLength: "2",
              maxLength: "40",
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
            })}
            className='input login__input'
            onChange={handleEmail}
            value={email}
            id='email'
            name='Email'
            placeholder='Email'
            autoComplete='off'
            type='email'
          />
          {errors?.Email && (
            <span className='register__error login__error_email'>
              Что-то пошло не так...
            </span>
          )}
          <label className='register__label login__label'>Пароль</label>
          <input
            {...register("password", {
              required: true,
              minLength: "2",
              maxLength: "40",
            })}
            className='input login__input'
            id='password'
            name='password'
            type='password'
            placeholder='Пароль'
            autoComplete='on'
            onChange={handlePassword}
            value={password}
          />
          {errors?.password && (
            <span className='register__error login__error_password'>
              Что-то пошло не так...
            </span>
          )}
        </fieldset>
      </form>
      <button
        className={
          isValid ? "button login__button" : "button login__button-disable"
        }
        type='submit'
        onClick={handleLogSubmit}
        disabled={!isValid}
      >
        <span className='login__span'>Войти</span>
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
