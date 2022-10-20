import { React, useState } from "react";
import Footer from "../Footer/Footer";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesHeader from "../MoviesHeader/MoviesHeader";
import SavedCardList from "../Movies/MoviesCardList/SavedCardList";
import "./SavedMovies.css";

const SavedMovies = ({
  checked,
  shortMovie,
  movie,
  onChangeSearchValue,
  searchValue,
  handleGetMovies,
  handleShortMovie,
  handleDeleteMovie,
  handlePostMovie,
}) => {
  return (
    <main className='savedMovies'>
      <MoviesHeader />
      <SearchForm
        searchValue={searchValue}
        onChangeSearchValue={onChangeSearchValue}
        handleGetMovies={handleGetMovies}
        handleShortMovie={handleShortMovie}
      />
      <SavedCardList
        items={checked ? shortMovie : movie}
        handleDeleteMovie={handleDeleteMovie}
        handlePostMovie={handlePostMovie}
      />
      <Footer />
    </main>
  );
};

export default SavedMovies;
