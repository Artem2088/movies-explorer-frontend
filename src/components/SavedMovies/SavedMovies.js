import { React, useState } from "react";
import Footer from "../Footer/Footer";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesHeader from "../MoviesHeader/MoviesHeader";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import * as MainApi from "../../utils/MainApi";
import "./SavedMovies.css";

const SavedMovies = ({ onChangeSearchValue, searchValue }) => {
  const [postMovie, setPostMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handlePostMovie = (searchValue) => {
    setIsLoading(true);
    if (!searchValue) {
      alert("Заполнить");
      setIsLoading(false);
      return false;
    }
    MainApi.postMovie()
      .then(() => {
        localStorage.setItem("postMovie", JSON.stringify(postMovie));
        setPostMovie(postMovie);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main className='savedMovies'>
      <MoviesHeader />
      <SearchForm
        searchValue={searchValue}
        onChangeSearchValue={onChangeSearchValue}
        handlePostMovie={handlePostMovie}
      />
      <MoviesCardList
        isLoading={isLoading}
        handlePostMovie={handlePostMovie}
        postMovie={postMovie}
      />
      <Footer />
    </main>
  );
};

export default SavedMovies;
