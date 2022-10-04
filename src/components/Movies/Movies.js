import React from "react";
import "./Movies.css";
import MoviesHeader from "../MoviesHeader/MoviesHeader";
import Footer from "../Footer/Footer";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
// import Modal from "../Modal/Modal";

const Movies = () => {
  return (
    <>
      <div className='movies'>
        <MoviesHeader />
        <SearchForm />
        <MoviesCardList />
        <Footer />
        {/* <Modal /> */}
      </div>
    </>
  );
};

export default Movies;
