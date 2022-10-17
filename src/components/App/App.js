import { Routes, Route, useNavigate } from "react-router-dom";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import PageNotFaund from "../PageNotFaund/PageNotFaund";
import "./App.css";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import * as MainApi from "../../utils/MainApi";
import * as MoviesApi from "../../utils/MoviesApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [span, setSpan] = useState("");
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      getUserInfo();
      getBetfilm();
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
          setTitle("Что-то пошло не так! Попробуйте ещё раз.");
          setSpan(err);
          setModal(true);
        });
    }
  }, []);

  const getBetfilm = () => {
    MoviesApi.getMovies()
      .then((movies) => {
        setMovies(movies);
        localStorage.setItem("films", JSON.stringify(movies));
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("films");
      });
  };

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
        setTitle("Что-то пошло не так! Попробуйте ещё раз.");
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
        setTitle("Что-то пошло не так! Попробуйте ещё раз.");
        setSpan(err);
        setModal(true);
      });
  };

  const handleLogout = (token) => {
    localStorage.removeItem("jwt", token);
    localStorage.removeItem("films");
    localStorage.removeItem("shortMovie");
    localStorage.removeItem("searchValue");
    setisLoggedIn(false);
    navigate("/");
  };

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
              element={
                <Movies isLoggedIn={isLoggedIn} movies={movies} modal={modal} />
              }
            />
            <Route
              path='/saved-movies'
              element={
                <SavedMovies
                  isLoggedIn={isLoggedIn}
                  movies={movies}
                  modal={modal}
                />
              }
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
