import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";

import Register from "../Register/Register";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Main from "../Main/Main";

import Header from "../Header/Header";
import MoviesHeader from "../MoviesHeader/MoviesHeader";
import Footer from "../Footer/Footer";
import PageNotFaund from "../PageNotFaund/PageNotFaund";
import "./App.css";
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
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const location = useLocation();

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
            setLoggedIn(true);
            navigate(location.pathname);
          }
        })
        .catch((err) => {
          handleLogout();
          setTitle(MESSAGE_ERR.validAuthErr);
          setSpan(err);
          setModal(true);
        });
    } else {
      navigate("/");
      handleLogout();
    }
  }, []);

  // -----------------------------------Auth---------------------------------

  const getUserInfo = async () => {
    await MainApi.getUserInfo()
      .then((user) => {
        setCurrentUser(user);
        setLoggedIn(true);
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
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        handleLogout();
        setTitle(MESSAGE_ERR.validAuthErr);
        setSpan(err);
        setLoggedIn(false);
        setModal(true);
      });
  };

  const register = (name, email, password) => {
    MainApi.register(name, email, password)
      .then(() => {
        login(email, password);
      })
      .catch((err) => {
        console.error(err);
        setTitle(MESSAGE_ERR.validAuthErr);
        setSpan(err);
        setModal(true);
      });
  };

  //-------------------------------------Profile-----------------------------------------
  const updateProfile = (name, email) => {
    MainApi.patchUserMe(name, email)
      .then(() => {
        setCurrentUser({ name, email });
        setModal(true);
        setTitle(MESSAGE_ERR.approvedProfile);
      })
      .catch((err) => {
        console.log(err);
        setCurrentUser(currentUser);
        setModal(true);
        setTitle(MESSAGE_ERR.spanErr);
        setSpan(err);
      });
  };

  // --------------------------------------Logout----------------------------------------

  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
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
              element={
                !isLoggedIn ? (
                  <Register onRegister={register} />
                ) : (
                  <Navigate to='/' />
                )
              }
            />
            <Route
              path='/signin'
              element={
                !isLoggedIn ? <Login onLogin={login} /> : <Navigate to='/' />
              }
            />

            <Route
              exact
              path='/'
              element={
                <>
                  {isLoggedIn ? (
                    <ProtectedRoute
                      isLoggedIn={isLoggedIn}
                      component={MoviesHeader}
                    />
                  ) : (
                    <Header />
                  )}
                  <Main />
                  <Footer />
                </>
              }
            />
            <Route
              path='/movies'
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  component={Movies}
                  user={currentUser}
                  modal={modal}
                />
              }
            />
            <Route
              path='/saved-movies'
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  component={Movies}
                  user={currentUser}
                />
              }
            />
            <Route
              path='/profile'
              element={
                <ProtectedRoute
                  component={Profile}
                  isLoggedIn={isLoggedIn}
                  modal={modal}
                  handleLogout={handleLogout}
                  updateProfile={updateProfile}
                />
              }
            />
            <Route
              path='*'
              element={
                <ProtectedRoute
                  component={PageNotFaund}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
          </Routes>
          <Modal span={span} title={title} modal={modal} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
