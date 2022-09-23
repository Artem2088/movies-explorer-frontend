import React from "react";
import "./SearchForm.css";
import search from "../../../images/icon/icon-search.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

const SearchForm = () => {
  return (
    <div className='searchForm'>
      <div className='searchForm__field'>
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
      </div>
      <FilterCheckbox />
    </div>
  );
};

export default SearchForm;
