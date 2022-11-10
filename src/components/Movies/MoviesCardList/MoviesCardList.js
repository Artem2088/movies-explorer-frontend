import { React, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { MESSAGE_ERR } from "../../../utils/Constant";
import "./MoviesCardList.css";
import { LIMIT } from "../../../utils/Constant";

const MoviesCardList = ({
  loading,
  items,
  err,
  addSaved,
  removeSaved,
  savedData,
  setSavedData,
  step,
  setStep,
}) => {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const [isSearchResult, setSearchResult] = useState(false);

  const checkQtyItem = () => {
    if (pathname === "/saved-movies") {
      return items.length;
    }

    return step * LIMIT;
  };

  useEffect(() => {
    let savedSearchInput = document.querySelector(".searchForm__input");

    if (pathname === "/movies" && items.length > checkQtyItem()) {
      return setVisible(true);
    }

    if (pathname === "/movies") {
      setSearchResult(!!localStorage.getItem("search_text"));
    }

    if (pathname === "/saved-movies") {
      setSearchResult(savedSearchInput.value);
    }

    setVisible(false);
  }, [step, isSearchResult, items]);

  if (err)
    return (
      <section className='cardList'>
        <h1>{err}</h1>
      </section>
    );

  return (
    <section className='cardList'>
      <ul className='cardList__container'>
        {loading ? (
          <Preloader />
        ) : items.length ? (
          items
            .slice(0, checkQtyItem())
            .map((film, index) => (
              <MoviesCard
                key={pathname === "/movies" ? film.id : index}
                {...film}
                addSaved={addSaved}
                removeSaved={removeSaved}
                savedData={savedData}
                setSavedData={setSavedData}
              />
            ))
        ) : isSearchResult ? (
          <h1>{MESSAGE_ERR.foundErr}</h1>
        ) : (
          ""
        )}
      </ul>
      <div className='cardList__block'>
        {visible ? (
          <button className='cardList__plus' onClick={() => setStep(step + 1)}>
            Ещё
          </button>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default MoviesCardList;
