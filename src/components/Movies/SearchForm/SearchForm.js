import React, { useState } from "react";
import "./SearchForm.css";
import search from "../../../images/icon/icon-search.svg";
import searchInput from "../../../images/icon/icon-search-input.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Modal from "../../Modal/Modal";
import { MESSAGE_ERR } from "../../../utils/Constant";
import { useEffect } from "react";

const SearchForm = ({ searchAction, short }) => {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");

  let search_text = "";

  const onChangeSearchValue = (e) => {
    search_text = e.target.value;
  };

  const handleSubmit = (e) => {
    if (search_text == "") {
      e.preventDefault();
      setTitle(MESSAGE_ERR.validInput);
      return setModal(true);
    }
    e.preventDefault();
    searchAction(search_text);
    localStorage.setItem("search_text", search_text);
  };

  return (
    <form className='searchForm' onSubmit={handleSubmit}>
      <Modal modal={modal} title={title} />
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
        <button
          className='searchForm__block'
          type='submit'
          onClick={() => {
            setModal(true);
          }}
        >
          <img src={search} alt='поиск' className='searchForm__icon' />
        </button>
        <FilterCheckbox short={short} />
      </div>
    </form>
  );
};

export default SearchForm;
