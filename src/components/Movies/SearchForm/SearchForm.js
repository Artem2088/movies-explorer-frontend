import { React, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./SearchForm.css";
import search from "../../../images/icon/icon-search.svg";
import searchInput from "../../../images/icon/icon-search-input.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Modal from "../../Modal/Modal";
import { MESSAGE_ERR } from "../../../utils/Constant";

const SearchForm = ({ searchAction, short, short_status }) => {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [searchText, setSearchText] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/movies") {
      setSearchText(localStorage.getItem("search_text"));
    } else {
      setSearchText("");
    }
  }, [pathname]);

  const onChangeSearchValue = (e) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = (e) => {
    if (searchText === "") {
      e.preventDefault();
      setTitle(MESSAGE_ERR.validInput);
      return setModal(true);
    }
    e.preventDefault();
    searchAction(searchText);
    if (pathname === "/movies") {
      localStorage.setItem("search_text", searchText);
    }
    return setModal(false);
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
          value={searchText || ""}
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
        <FilterCheckbox short={short} short_status={short_status} />
      </div>
    </form>
  );
};

export default SearchForm;
