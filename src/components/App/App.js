import { Routes, Route } from "react-router-dom";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import PageNotFaund from "../PageNotFaund/PageNotFaund";
import * as MoviesApi from "../../utils/MoviesApi";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleGetMovies();
  }, []);

  function handleGetMovies() {
    setLoading(true);
    MoviesApi.getMovies()
      .then((movies) => {
        setMovies(movies);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }

  return (
    <div className='page'>
      <div className='page__container'>
        <Routes>
          <Route path='/signup' element={<Register />} />
          <Route path='/signin' element={<Login />} />
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
                items={movies}
                loading={loading}
                handleGetMovies={handleGetMovies}
              />
            }
          />
          <Route path='/saved-movies' element={<SavedMovies />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='*' element={<PageNotFaund />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
