import React from "react";
import { useForm } from "react-hook-form";
import "./Register.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const Register = ({ onRegister }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onTouched" });

  const handleRegName = (e) => {
    setName(e.target.value);
  };

  const handleRegEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleRegPass = (e) => {
    setPassword(e.target.value);
  };

  const handleRegSubmit = (e) => {
    e.preventDefault();
    onRegister(name, email, password);
  };

  return (
    <div className='register'>
      <div className='register__container'>
        <Link to={"/"} className='register__link'>
          <div className='logo'></div>
        </Link>
        <h2 className='register__title'>Добро пожаловать!</h2>
      </div>
      <form
        className='form'
        onSubmit={handleSubmit(handleRegSubmit)}
        noValidate
      >
        <fieldset className='fieldset register__fieldset'>
          <label className='register__label'>Имя</label>
          <input
            {...register("Name", {
              required: true,
              minLength: "2",
              maxLength: "40",
            })}
            className='input register__input'
            id='name'
            type='text'
            name='Name'
            placeholder='Имя'
            autoComplete='on'
            onChange={handleRegName}
            value={name}
          />
          {errors?.Name && (
            <span className='register__error register__error_name'>
              Что-то пошло не так...
            </span>
          )}

          <label className='register__label'>E-mail</label>
          <input
            {...register("Email", {
              required: true,
              minLength: "2",
              maxLength: "40",
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
            })}
            className='input register__input'
            id='email'
            type='email'
            name='Email'
            placeholder='Email'
            autoComplete='on'
            onChange={handleRegEmail}
            value={email}
          />
          {errors?.Email && (
            <span className='register__error register__error_email'>
              Что-то пошло не так...
            </span>
          )}

          <label className='register__label'>Пароль</label>
          <input
            {...register("password", {
              required: true,
              minLength: "2",
              maxLength: "40",
            })}
            className='input register__input'
            id='password'
            name='password'
            type='password'
            placeholder='Пароль'
            autoComplete='on'
            onChange={handleRegPass}
            value={password}
          />
          {errors?.password && (
            <span className='register__error register__error_password'>
              Что-то пошло не так...
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
        onClick={handleRegSubmit}
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
