import { React, useEffect, useState } from "react";
import "./Movies.css";
import MoviesHeader from "../MoviesHeader/MoviesHeader";
import Footer from "../Footer/Footer";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

const Movies = ({
  onChangeSearchValue,
  searchValue,
  handleGetMovies,
  handleShortMovie,
  updateData,
  shortMovie,
  movie,
  isLoading,
  checked,
  handlePostMovie,
}) => {
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
          handlePostMovie={handlePostMovie}
        />
        <Footer />
      </main>
    </>
  );
};

export default Movies;
