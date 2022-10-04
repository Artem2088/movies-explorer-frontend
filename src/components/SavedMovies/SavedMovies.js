import React from "react";
import Footer from "../Footer/Footer";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesHeader from "../MoviesHeader/MoviesHeader";
import "./SavedMovies.css";
import MoviesCard from "../Movies/MoviesCard/MoviesCard";

const SavedMovies = () => {
  return (
    <div className='savedMovies'>
      <MoviesHeader />
      <SearchForm />
      <section className='savedMovies__list'>
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </section>
      <Footer />
    </div>
  );
};

export default SavedMovies;
