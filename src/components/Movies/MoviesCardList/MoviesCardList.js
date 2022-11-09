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
  add_saved,
  remove_saved,
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
    if (pathname === "/movies" && items.length > checkQtyItem()) {
      return setVisible(true);
    }

    if (pathname === "/movies") {
      setSearchResult(!!localStorage.getItem("search_text"));
    }

    if (pathname === "/saved-movies") {
      setSearchResult(false);
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
            .map((obj) => (
              <MoviesCard
                key={pathname === "/movies" ? obj.id : obj.movieId}
                {...obj}
                add_saved={add_saved}
                remove_saved={remove_saved}
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
