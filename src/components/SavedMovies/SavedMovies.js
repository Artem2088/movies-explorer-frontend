import { React, useState } from "react";
import Footer from "../Footer/Footer";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesHeader from "../MoviesHeader/MoviesHeader";
import SavedCardList from "../Movies/MoviesCardList/SavedCardList";
import "./SavedMovies.css";

const SavedMovies = ({
  checked,
  shortMovieSave,
  movie,
  onChangeSearchValue,
  searchValue,
  handleGetMoviesAdd,
  handleShortMovieAdd,
  handleDeleteMovie,
  handlePostMovie,
}) => {
  return (
    <main className='savedMovies'>
      <MoviesHeader />
      <SearchForm
        searchValue={searchValue}
        onChangeSearchValue={onChangeSearchValue}
        handleGetMoviesAdd={handleGetMoviesAdd}
        handleShortMovieAdd={handleShortMovieAdd}
      />
      <SavedCardList
        shortMovieSave={shortMovieSave}
        // items={checked ? shortMovie : movie}
        handleDeleteMovie={handleDeleteMovie}
        handlePostMovie={handlePostMovie}
      />
      <Footer />
    </main>
  );
};

export default SavedMovies;
