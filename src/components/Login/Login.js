import { React, useContext, useEffect } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useValidation from "../../hooks/useValidation";

const Login = ({ onLogin }) => {
  const currentUser = useContext(CurrentUserContext);
  const { handleChange, nameValues, errors, isValid, resetForm, handleSubmit } =
    useValidation(onLogin);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

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
      <form className='form' onSubmit={handleSubmit} noValidate>
        <fieldset className='fieldset login__fieldset'>
          <label className='register__label login__label'>E-mail</label>
          <input
            className='input login__input'
            onChange={handleChange}
            value={nameValues.email || ""}
            id='email'
            name='email'
            autoComplete='off'
            type='email'
            minLength='2'
            maxLength='40'
            required
          />
          {errors.email && (
            <span className='register__error login__error_email'>
              {errors.email}
            </span>
          )}
          <label className='register__label login__label'>Пароль</label>
          <input
            className='input login__input'
            id='password'
            name='password'
            type='password'
            autoComplete='off'
            onChange={handleChange}
            value={nameValues.password || ""}
            required
            minLength='3'
            maxLength='40'
          />
          {errors?.password && (
            <span className='register__error login__error_password'>
              {errors.password}
            </span>
          )}
        </fieldset>
      </form>
      <button
        className={
          isValid ? "button login__button" : "button login__button-disable"
        }
        type='submit'
        onClick={handleSubmit}
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
