import React from "react";
import Footer from "../Footer/Footer";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesHeader from "../MoviesHeader/MoviesHeader";
import "./SavedMovies.css";
import MoviesCard from "../Movies/MoviesCard/MoviesCard";

const SavedMovies = () => {
  return (
    <main className='savedMovies'>
      <MoviesHeader />
      <SearchForm />
      <ul className='savedMovies__list'>
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>
      <Footer />
    </main>
  );
};

export default SavedMovies;
