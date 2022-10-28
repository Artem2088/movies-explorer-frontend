import { React, useState } from "react";
import Footer from "../Footer/Footer";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesHeader from "../MoviesHeader/MoviesHeader";
import SavedCardList from "../Movies/MoviesCardList/SavedCardList";
import "./SavedMovies.css";

const SavedMovies = ({}) => {
  return (
    <main className='savedMovies'>
      <MoviesHeader />
      <SearchForm />
      <SavedCardList />
      <Footer />
    </main>
  );
};

export default SavedMovies;
