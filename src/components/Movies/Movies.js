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
  addMovie,
  handleGetAllMovies,
  resultAllMovie,
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
          handleGetAllMovies={handleGetAllMovies}
          updateData={updateData}
        />
        <MoviesCardList
          handleGetAllMovies={handleGetAllMovies}
          postMovie={addMovie}
          // items={checked ? shortMovie : resultAllMovie}
          checked={checked}
          shortMovie={shortMovie}
          isLoading={isLoading}
          handlePostMovie={handlePostMovie}
          resultAllMovie={resultAllMovie}
        />
        <Footer />
      </main>
    </>
  );
};

export default Movies;
