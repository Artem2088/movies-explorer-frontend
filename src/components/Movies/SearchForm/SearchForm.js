import React, { useState } from "react";
import "./SearchForm.css";
import search from "../../../images/icon/icon-search.svg";
import searchInput from "../../../images/icon/icon-search-input.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const SearchForm = ({
  handleGetMoviesAdd,
  handleShortMovieAdd,
  handleShortMovie,
  handlePostMovie,
  updateData,
  handleGetAllMovies,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const pathname = useLocation();

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
    localStorage.setItem("searchValue", event.target.value);
  };

  const searchFormValue = () => {
    if (pathname !== "/saved-movies") {
      handleGetMoviesAdd(searchValue);
    } else {
      handlePostMovie(searchValue);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchFormValue();
  };

  return (
    <form className='searchForm'>
      <div className='searchForm__field'>
        <img src={searchInput} alt='поиск' className='searchForm__inputIcon' />
        <input
          value={searchValue}
          onChange={onChangeSearchValue}
          type='text'
          name='film'
          id='film'
          placeholder='Фильм'
          className='searchForm__input'
        />
        <button
          className='searchForm__block'
          type='submit'
          onClick={handleSubmit}
        >
          <img src={search} alt='поиск' className='searchForm__icon' />
        </button>
        <FilterCheckbox
          handleShortMovieAdd={handleShortMovieAdd}
          handleShortMovie={handleShortMovie}
          updateData={updateData}
        />
      </div>
    </form>
  );
};

export default SearchForm;
