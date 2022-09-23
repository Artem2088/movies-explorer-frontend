import React from "react";
import Footer from "../Footer/Footer";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesHeader from "../MoviesHeader/MoviesHeader";
import "./SavedMovies.css";

const SavedMovies = () => {
  return (
    <div className='savedMovies'>
      <MoviesHeader />
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </div>
  );
};

export default SavedMovies;
