import { React, useEffect, useState } from "react";
import "./Movies.css";
import MoviesHeader from "../MoviesHeader/MoviesHeader";
import Footer from "../Footer/Footer";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import * as MainApi from "../../utils/MainApi";

const Movies = ({ onChangeSearchValue, searchValue, movies }) => {
  const [movie, setMovie] = useState([]);
  const [shortMovie, setShortMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleGetMovies = (searchValue) => {
    setIsLoading(true);
    if (!searchValue) {
      alert("Заполнить");
      setIsLoading(false);
      return false;
    }
    MainApi.getMovies()
      .then(() => {
        const filterData = movies.filter(({ nameRU }) =>
          nameRU.toLowerCase().includes(searchValue.toLowerCase())
        );
        localStorage.setItem("filterData", JSON.stringify(filterData));
        setMovie(filterData);
      })
      .catch((err) => {
        console.log(err);
        setMovie([]);
        localStorage.removeItem("films");
      })
      .finally(() => setIsLoading(false));
  };

  const handleShortMovie = () => {
    if (!checked) {
      setIsLoading(true);
      MainApi.getMovies()
        .then(() => {
          const shortMovie = movies.filter(({ duration }) => duration <= 40);
          localStorage.setItem("shortMovie", JSON.stringify(shortMovie));
          setShortMovie(shortMovie);
        })
        .catch((err) => {
          console.log(err);
          setShortMovie([]);
          localStorage.removeItem("shortMovies");
        })
        .finally(() => setIsLoading(false));
      return false;
    }
  };

  const updateData = (checked) => {
    setChecked(checked);
  };

  return (
    <>
      <main className='movies'>
        <MoviesHeader />
        <SearchForm
          searchValue={searchValue}
          onChangeSearchValue={onChangeSearchValue}
          handleGetMovies={handleGetMovies}
          handleShortMovie={handleShortMovie}
          updateData={updateData}
        />
        <MoviesCardList
          items={checked ? shortMovie : movie}
          isLoading={isLoading}
        />
        <Footer />
      </main>
    </>
  );
};

export default Movies;
