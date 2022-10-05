import { Routes, Route } from "react-router-dom";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Main from "../Main/Main";
import PageNotFaund from "../PageNotFaund/PageNotFaund";
import * as MoviesApi from "../../utils/MoviesApi";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    MoviesApi.getMovies()
      .then((movies) => {
        setMovies(movies);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className='page'>
      <div className='page__container'>
        <Routes>
          <Route path='/signup' element={<Register />} />
          <Route path='/signin' element={<Login />} />
          <Route path='/' element={<Main />} />
          <Route
            path='/movies'
            element={
              <Movies
                items={movies}
                isLoading={isLoading}
                searchValue={searchValue}
                onChangeSearchValue={onChangeSearchValue}
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
