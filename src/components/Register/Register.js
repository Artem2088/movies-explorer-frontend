import { React, useEffect } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import useValidation from "../../utils/useValidation";

const Register = ({ onRegister }) => {
  const { handleChange, nameValues, errors, isValid, resetForm, handleSubmit } =
    useValidation(onRegister);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <div className='register'>
      <div className='register__container'>
        <Link to={"/"} className='register__link'>
          <div className='logo'></div>
        </Link>
        <h2 className='register__title'>Добро пожаловать!</h2>
      </div>
      <form className='form' onSubmit={handleSubmit} noValidate>
        <fieldset className='fieldset register__fieldset'>
          <label className='register__label'>Имя</label>
          <input
            className='input register__input'
            id='name'
            type='text'
            name='name'
            autoComplete='off'
            onChange={handleChange}
            value={nameValues.name || ""}
            required
            minLength='2'
            maxLength='40'
          />
          {errors?.name && (
            <span className='register__error register__error_name'>
              {errors.name}
            </span>
          )}

          <label className='register__label'>E-mail</label>
          <input
            className='input register__input'
            id='email'
            type='email'
            name='email'
            autoComplete='off'
            onChange={handleChange}
            value={nameValues.email || ""}
            required
            minLength='2'
            maxLength='40'
          />
          {errors?.email && (
            <span className='register__error register__error_email'>
              {errors.email}
            </span>
          )}

          <label className='register__label'>Пароль</label>
          <input
            className='input register__input'
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
            <span className='register__error register__error_password'>
              {errors.password}
            </span>
          )}
        </fieldset>
      </form>
      <button
        className={
          isValid
            ? "button register__button"
            : "button register__button-disable"
        }
        type='submit'
        onClick={handleSubmit}
        disabled={!isValid}
      >
        <span className='register__span'> Зарегестрироваться</span>
      </button>
      <p className='register__description'>
        Уже зарегистрированы?
        <Link className='button register__button_enter' to='/signin'>
          Войти
        </Link>
      </p>
    </div>
  );
};

export default Register;
