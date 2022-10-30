import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { MESSAGE_ERR } from "../../../utils/Constant";
import "./MoviesCardList.css";

const MoviesCardList = ({
  loading,
  items,
  err,
  add_saved,
  remove_saved,
  SavedData,
}) => {
  const { pathname } = useLocation();

  const [step, setStep] = useState(1);
  let LIMIT = 7;

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
            .slice(0, step * LIMIT)
            .map((obj, i) => (
              <MoviesCard
                key={i}
                {...obj}
                add_saved={add_saved}
                remove_saved={remove_saved}
                SavedData={SavedData}
              />
            ))
        ) : (
          <h1>{MESSAGE_ERR.foundErr}</h1>
        )}
      </ul>
      <div className='cardList__block'>
        {pathname == "/movies" && items.length > 7 ? (
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
