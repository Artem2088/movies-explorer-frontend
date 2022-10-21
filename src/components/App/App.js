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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [span, setSpan] = useState("");
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState([]);
  const [filterPostMovie, setFilterPostMovie] = useState([]);
  const [deleteMovie, setDeleteMovie] = useState([]);
  const [shortMovie, setShortMovie] = useState([]);
  const [shortMovieSave, setShortMovieSave] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [postMovie, setPostMovie] = useState([]);
  const [click, setClick] = useState("");
  const [resultAllMovie, setResultAllMovie] = useState([]);

  // ----------------------useEffect----------------------
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

  // --------------------------------MOVIE-------------------------

  const updateData = (checked) => {
    setChecked(checked);
  };

  const handleClick = () => {
    setClick(click);
  };

  // -------------------------------------Поиск по всем фильмам -----------------------------------
  const handleShortMovie = () => {
    if (!checked) {
      setIsLoading(true);
    }
    let resultMovie = JSON.parse(localStorage.getItem("films"));
    const shortMovie = resultMovie.filter(({ duration }) => duration <= 40);
    if (shortMovie) {
      localStorage.setItem("shortMovie", JSON.stringify(shortMovie));
      setShortMovie(shortMovie);
      setIsLoading(false);
    } else {
      setModal(true);
      setTitle("Ничего не найдено");
      setIsLoading(false);
    }
  };

  const handleGetAllMovies = async (searchValue) => {
    setIsLoading(true);
    if (!searchValue) {
      setModal(true);
      setTitle("Нужно ввести ключевое слово");
      setIsLoading(false);
      return false;
    }
    let resultMovie = await JSON.parse(localStorage.getItem("films"));
    const filterResultMovie = await resultMovie.filter(({ nameRU }) =>
      nameRU.toLowerCase().includes(searchValue.toLowerCase())
    );
    if (filterResultMovie.length > 0) {
      setIsLoading(true);
      setResultAllMovie(filterResultMovie);
      localStorage.setItem(
        "filterResultMovie",
        JSON.stringify(filterResultMovie)
      );
      setIsLoading(false);
    } else {
      setModal(true);
      setTitle("Ничего не найдено");
      setIsLoading(false);
    }
  };
  //--------------------------------------------Поиск по сохраненным фильмам---------------------------------------------------

  const handleShortMovieAdd = () => {
    if (!checked) {
      setIsLoading(true);
      MainApi.getMovies()
        .then(() => {
          let resultMovie = JSON.parse(localStorage.getItem("postFilm")) || [];
          const shortMovieSave = resultMovie.filter(
            ({ duration }) => duration <= 40
          );
          localStorage.setItem("shortMovieAdd", JSON.stringify(shortMovieSave));
          setShortMovieSave(shortMovieSave);
        })
        .catch((err) => {
          console.log(err);
          setShortMovieSave([]);
          setModal(true);
          setTitle("Что-то пошло не так...");
          setSpan(err);
        })
        .finally(() => setIsLoading(false));
      return false;
    }
  };

  const handleGetMoviesAdd = (searchValue) => {
    setIsLoading(true);
    if (!searchValue) {
      setModal(true);
      setTitle("Нужно ввести ключевое слово");
      setIsLoading(false);
      return false;
    }
    MainApi.getMovies()
      .then(() => {
        let resultMovie = JSON.parse(localStorage.getItem("postFilm")) || [];
        const filterSaveData = resultMovie.filter(({ nameRU }) =>
          nameRU.toLowerCase().includes(searchValue.toLowerCase())
        );
        localStorage.setItem("filterSaveData", JSON.stringify(filterSaveData));
        setMovie(filterSaveData);
        console.log(movie);
      })
      .catch((err) => {
        console.log(err);
        setMovie([]);
        setModal(true);
        setTitle("Что-то пошло не так...");
        setSpan(err);
      })
      .finally(() => setIsLoading(false));
  };

  // ------------------------------------------Сохранение и удаление фильмов в базу ------------------------------

  async function handlePostMovie(id, movie) {
    // const Favorites = JSON.parse(localStorage.getItem("postMovie")) || [];
    // let result = [];
    // const existFilm = Favorites.find((el) => el == id);
    // if (existFilm) result = Favorites.filter((el) => el != id);
    // else result = [...Favorites, id];
    await MainApi.postMovie(movie);
    try {
      // localStorage.setItem("postMovie", JSON.stringify(result));
      setPostMovie(movie);
      console.log(postMovie);
    } catch (err) {
      console.log(err);
      setPostMovie([]);
      setModal(true);
      setTitle("Что-то пошло не так...");
      setSpan(err);
    }
  }

  // mainApi.deleteMovie(movie._id)
  // .then((deletedMovie) => {
  //   const newList = moviesList.filter(item => item.movieId !== deletedMovie.movieId);
  //   setMoviesList(newList);

  //   const newVisible = visibleMovies.filter(item => item.movieId !== deletedMovie.movieId);
  //   setVisibleMovies(newVisible);
  //   localStorage.setItem(JSON.stringify(newVisible));

  const handleDeleteMovie = (movie) => {
    MainApi.deleteMovie(movie._id)
      .then((res) => {
        console.log(res);
        // const newList = movie.filter(
        //   (item) => item.movieId !== deleteMovie.movieId
        // );
        // setMovie(newList);
        // const newVisible = postMovie.filter(
        //   (item) => item.movieId !== deleteMovie.movieId
        // );
        // setPostMovie(newVisible);
      })
      .catch((err) => {
        console.log(err);
        setModal(true);
        setTitle("Что-то пошло не так...");
        setSpan(err);
      });
  };

  // ------------------------------------ Запрос на получение фильмов с BetFilm ----------------------
  const getBetfilm = () => {
    MoviesApi.getMovies()
      .then((movies) => {
        setMovies(movies);
        localStorage.setItem("films", JSON.stringify(movies));
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("films");
        setModal(true);
        setTitle("Что-то пошло не так...");
        setSpan(err);
      });
  };

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

  // --------------------------------------Logout----------------------------------------

  const handleLogout = (token) => {
    localStorage.removeItem("jwt", token);
    localStorage.removeItem("films");
    localStorage.removeItem("shortMovie");
    localStorage.removeItem("searchValue");
    localStorage.removeItem("togle");
    localStorage.removeItem("filterData");
    localStorage.removeItem("postMovie");
    localStorage.removeItem("filterResultMovie");
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
              element={
                <Movies
                  isLoggedIn={isLoggedIn}
                  movie={movie}
                  modal={modal}
                  shortMovie={shortMovie}
                  // handleGetMovies={handleGetMovies}
                  handleShortMovie={handleShortMovie}
                  handleGetAllMovies={handleGetAllMovies}
                  resultAllMovie={resultAllMovie}
                  updateData={updateData}
                  checked={checked}
                  // handlePostMovie={handlePostMovie}
                  // postMovie={postMovie}
                  onClick={handleClick}
                  isLoading={isLoading}
                />
              }
            />
            <Route
              path='/saved-movies'
              element={
                <SavedMovies
                  isLoggedIn={isLoggedIn}
                  modal={modal}
                  movie={movie}
                  shortMovieSave={shortMovieSave}
                  checked={checked}
                  isLoading={isLoading}
                  handlePostMovie={handlePostMovie}
                  postMovie={postMovie}
                  handleGetMoviesAdd={handleGetMoviesAdd}
                  handleShortMovieAdd={handleShortMovieAdd}
                  handleDeleteMovie={handleDeleteMovie}
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
