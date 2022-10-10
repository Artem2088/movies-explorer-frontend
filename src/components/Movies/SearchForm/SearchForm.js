import React, { useState } from "react";
import "./SearchForm.css";
import search from "../../../images/icon/icon-search.svg";
import searchInput from "../../../images/icon/icon-search-input.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

const SearchForm = ({ handleGetMovies }) => {
  const [searchValue, setSearchValue] = useState("");

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleGetMovies(searchValue);
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
        <FilterCheckbox />
      </div>
    </form>
  );
};

export default SearchForm;
