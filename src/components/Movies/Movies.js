import React from "react";
import "./Movies.css";
import MoviesHeader from "../MoviesHeader/MoviesHeader";
import Footer from "../Footer/Footer";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import * as MoviesApi from "../../utils/MoviesApi";
import * as MainApi from "../../utils/MainApi";
import Modal from "../Modal/Modal";
import { useState } from "react";
import { useEffect } from "react";

const Movies = ({ onChangeSearchValue, searchValue }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   handleGetMovies();
  // }, []);

  async function handleGetMovies(searchValue) {
    setLoading(true);
    if (!searchValue) {
      return false;
    }

    try {
      const data = await MoviesApi.getMovies();
      const filterData = data.filter(({ nameRU }) =>
        nameRU.toLowerCase().includes(searchValue.toLowerCase())
      );
      localStorage.setItem("movies", JSON.stringify(filterData));
      localStorage.setItem("moviesInputSearch", searchValue);
      setMovies(filterData);
    } catch (err) {
      setMovies([]);
      localStorage.removeItem("movies");
      localStorage.removeItem("moviesInputSearch");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <main className='movies'>
        <MoviesHeader />
        <SearchForm
          searchValue={searchValue}
          onChangeSearchValue={onChangeSearchValue}
          handleGetMovies={handleGetMovies}
        />
        <MoviesCardList
          items={movies}
          handleGetMovies={handleGetMovies}
          loading={loading}
        />
        <Footer />
        {/* <Modal /> */}
      </main>
    </>
  );
};

export default Movies;
