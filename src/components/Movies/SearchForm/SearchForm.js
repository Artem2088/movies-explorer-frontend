import React from "react";
import "./SearchForm.css";
import search from "../../../images/icon/icon-search.svg";
import searchInput from "../../../images/icon/icon-search-input.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

const SearchForm = () => {
  return (
    <form className='searchForm'>
      <div className='searchForm__field'>
        <img src={searchInput} alt='поиск' className='searchForm__inputIcon' />
        <input
          type='text'
          name='film'
          id='film'
          placeholder='Фильм'
          className='searchForm__input'
        />
        <button className='searchForm__block'>
          <img src={search} alt='поиск' className='searchForm__icon' />
        </button>
        <FilterCheckbox />
      </div>
    </form>
  );
};

export default SearchForm;
