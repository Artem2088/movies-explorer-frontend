import React, { useState } from "react";
import "./SearchForm.css";
import search from "../../../images/icon/icon-search.svg";
import searchInput from "../../../images/icon/icon-search-input.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useEffect } from "react";

const SearchForm = ({ searchAction, short }) => {
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setSearchText(localStorage.getItem("search_text"));
    searchAction(searchText);
  }, []);

  let search_text = "";

  const onChangeSearchValue = (event) => {
    search_text = event.target.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchAction(search_text);
    localStorage.setItem("search_text", search_text);
  };

  return (
    <form className='searchForm' onSubmit={handleSubmit}>
      <div className='searchForm__field'>
        <img src={searchInput} alt='поиск' className='searchForm__inputIcon' />
        <input
          onChange={onChangeSearchValue}
          type='text'
          name='film'
          id='film'
          placeholder='Фильм'
          className='searchForm__input'
        />
        {/* {errValue ? (
          <span className='searchForm__error'>Нужно ввести ключевое слово</span>
        ) : (
          ""
        )} */}
        <button className='searchForm__block' type='submit'>
          <img src={search} alt='поиск' className='searchForm__icon' />
        </button>
        <FilterCheckbox short={short} />
      </div>
    </form>
  );
};

export default SearchForm;
