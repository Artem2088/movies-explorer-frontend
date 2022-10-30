import { Routes, Route, useNavigate } from "react-router-dom";

import Register from "../Register/Register";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Main from "../Main/Main";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import PageNotFaund from "../PageNotFaund/PageNotFaund";
import "./App.css";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import * as MainApi from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { MESSAGE_ERR } from "../../utils/Constant";

function App() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [span, setSpan] = useState("");
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  // ----------------------useEffect----------------------
  useEffect(() => {
    if (isLoggedIn) {
      getUserInfo();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      MainApi.checkToken(jwt)
        .then((res) => {
          if (res) {
            setisLoggedIn(true);
          }
        })
        .catch((err) => {
          setTitle(MESSAGE_ERR.validAuthErr);
          setSpan(err);
          setModal(true);
        });
    }
  }, []);

  // -----------------------------------Auth---------------------------------

  const getUserInfo = () => {
    MainApi.getUserInfo()
      .then((user) => {
        setCurrentUser(user);
        setisLoggedIn(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const login = (email, password) => {
    MainApi.login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          navigate("/movies");
          setisLoggedIn(true);
        }
      })
      .catch((err) => {
        setTitle(MESSAGE_ERR.validAuthErr);
        setSpan(err);
        setisLoggedIn(false);
        setModal(true);
      });
  };

  const register = (name, email, password) => {
    MainApi.register(name, email, password)
      .then(() => {
        navigate("/movies");
      })
      .catch((err) => {
        console.error(err);
        setTitle(MESSAGE_ERR.validAuthErr);
        setSpan(err);
        setModal(true);
      });
  };

  // --------------------------------------Logout----------------------------------------

  const handleLogout = (token) => {
    localStorage.removeItem("jwt", token);
    localStorage.removeItem("search_result");
    localStorage.removeItem("short");
    localStorage.removeItem("searchSave_result");
    localStorage.removeItem("shortSave");
    localStorage.removeItem("search_text");
    setisLoggedIn(false);
    navigate("/");
  };
  //  ---------------------------------------------------------------------------------------
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <div className='page__container'>
          <Routes>
            <Route
              path='/signup'
              element={<Register onRegister={register} />}
            />
            <Route path='/signin' element={<Login onLogin={login} />} />
            <Route
              exact
              path='/'
              element={
                <>
                  <Header />
                  <Main />
                  <Footer />
                </>
              }
            />
            <Route
              path='/movies'
              element={<Movies user={currentUser} modal={modal} />}
            />
            <Route
              path='/saved-movies'
              element={<Movies user={currentUser} />}
            />
            <Route
              path='/profile'
              element={
                <Profile
                  isLoggedIn={isLoggedIn}
                  modal={modal}
                  handleLogout={handleLogout}
                />
              }
            />
            <Route path='*' element={<PageNotFaund />} />
          </Routes>
          <Modal span={span} title={title} modal={modal} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
