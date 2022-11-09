import { React, useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import MoviesHeader from "../MoviesHeader/MoviesHeader";
import "./Profile.css";
import { MESSAGE_ERR } from "../../utils/Constant";
import useValidation from "../../hooks/useValidation";

const Profile = ({ handleLogout, updateProfile }) => {
  const [visible, setVisible] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const [changeUser, setChangeUser] = useState(false);
  const [errorBtn, setErrorBtn] = useState(false);
  const {
    handleChange,
    isValid,
    nameValues,
    errors,
    handleSubmit,
    setNameValues,
  } = useValidation(updateProfile);

  useEffect(() => {
    setNameValues(currentUser);
  }, [currentUser]);

  useEffect(() => {
    handleUser();
  }, [nameValues]);

  const handleErrorBtm = () => {
    if (!changeUser) {
      setErrorBtn(true);
    }
  };

  const handleUser = () => {
    if (currentUser === nameValues) {
      return setChangeUser(false);
    }
    setChangeUser(true);
  };

  const onClickHandleUser = () => {
    handleErrorBtm();
    {
      changeUser ? setVisible(true) : setVisible(false);
    }
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
              autoComplete='off'
              onChange={handleChange}
              value={nameValues?.name || ""}
              required
              minLength='2'
              maxLength='40'
            />
            {errors.name && (
              <span className='profile__input-span'>{errors.name}</span>
            )}

            <label className='profile__span_mail'>E-mail</label>
            <input
              className='input profile__input-email'
              onChange={handleChange}
              value={nameValues?.email || ""}
              id='email'
              name='email'
              autoComplete='off'
              type='email'
              minLength='2'
              maxLength='40'
              required
            />
            {errors.email && (
              <span className='profile__input-span_email'>{errors.email}</span>
            )}
          </fieldset>
        </form>
        <div
          className={`${
            visible ? "profile__block_unactiv" : "profile__block "
          }`}
        >
          {errorBtn ? (
            <span className='profile__error-span'>
              {MESSAGE_ERR.approvedProfileErr || errors}
            </span>
          ) : (
            ""
          )}
          <button className='profile__redact' onClick={onClickHandleUser}>
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
          <button
            className='button profile__button'
            onClick={changeUser ? handleSubmit : handleUser}
            disabled={!isValid}
            type='submit'
          >
            <span className='profile__button-span'>Сохранить</span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default Profile;
