import { React, useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import MoviesHeader from "../MoviesHeader/MoviesHeader";
import * as MainApi from "../../utils/MainApi";
import "./Profile.css";
import Modal from "../Modal/Modal";
import { MESSAGE_ERR } from "../../utils/Constant";

const Profile = ({ handleLogout }) => {
  const [visible, setVisible] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [span, setSpan] = useState("");
  const [newUser, setNewUser] = useState([]);
  const [changeUser, setChangeUser] = useState(false);
  const [errorBtn, setErrorBtn] = useState(false);
  const [modal, setModal] = useState("");
  const [title, setTitle] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  const handleErrorBtm = () => {
    if (!changeUser) {
      setErrorBtn(true);
    }
  };

  const handleUser = () => {
    if (currentUser.name || currentUser.Email === name || email) {
      setChangeUser(true);
    }
  };

  const onClickHandleUser = () => {
    handleErrorBtm();
    {
      changeUser ? setVisible(true) : setVisible(false);
    }
  };

  const handleChangeName = (e) => {
    handleUser();
    setName(e.target.value);
  };

  const handleChangeEmail = (e) => {
    handleUser();
    setEmail(e.target.value);
  };

  const handleProfSubmit = (e) => {
    e.preventDefault();
    updateProfile(name, email);
  };

  const updateProfile = (name, email) => {
    MainApi.patchUserMe(name, email)
      .then(() => {
        setNewUser(newUser);
        setModal(true);
        setTitle(MESSAGE_ERR.approvedProfile);
      })
      .catch((err) => {
        console.log(err);
        setNewUser([]);
        setModal(true);
        setTitle(MESSAGE_ERR.spanErr);
        setSpan(err);
      });
  };

  return (
    <main className='profile'>
      <MoviesHeader />
      <Modal modal={modal} title={title} span={span} />
      <div className='profile__container'>
        <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
        <form
          className='form'
          onSubmit={handleSubmit(handleProfSubmit)}
          noValidate
        >
          <fieldset className='fieldset profile__fieldset'>
            <label className='profile__span'>Имя</label>
            <input
              {...register("name", {
                required: true,
                minLength: "2",
                maxLength: "40",
              })}
              className='input profile__input'
              id='name'
              type='text'
              name='name'
              autoComplete='off'
              onChange={handleChangeName}
              value={name || ""}
            />

            <label className='profile__span_mail'>E-mail</label>
            <input
              {...register("Email", {
                required: true,
                minLength: "2",
                maxLength: "40",
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
              })}
              className='input profile__input'
              id='email'
              type='email'
              name='Email'
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
          {errorBtn ? (
            <span className='profile__error-span'>
              {MESSAGE_ERR.approvedProfileErr}
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
          {errors?.name && (
            <span className='profile__input-span'>{MESSAGE_ERR.spanErr}</span>
          )}

          {errors?.Email && (
            <span className='profile__input-span'>{MESSAGE_ERR.spanErr}</span>
          )}
          <button
            className='button profile__button'
            onClick={handleProfSubmit}
            disabled={isValid}
          >
            <span className='profile__button-span' modal={modal} title={title}>
              Сохранить
            </span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default Profile;
