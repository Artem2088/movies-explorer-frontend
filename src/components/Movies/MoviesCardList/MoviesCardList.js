import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import "./MoviesCardList.css";

const MoviesCardList = ({ isLoading, handlePostMovie, checked }) => {
  const [renderMovie, setRenderMovie] = useState([]);

  useEffect(() => {
    if (!checked) {
      const filmsFilter =
        JSON.parse(localStorage.getItem("filterResultMovie")) || [];
      setRenderMovie(filmsFilter);
    } else {
      const filmsFilterShort =
        JSON.parse(localStorage.getItem("shortMovie")) || [];
      setRenderMovie(filmsFilterShort);
    }
  }, [renderMovie]);

  return (
    <section className='cardList'>
      <ul className='cardList__container'>
        {isLoading ? (
          <Preloader />
        ) : (
          renderMovie.map((obj) => (
            <MoviesCard
              key={obj.id}
              {...obj}
              handlePostMovie={handlePostMovie}
              item={obj}
            />
          ))
        )}
      </ul>
      <div className='cardList__block'>
        <button className='cardList__plus'>Ещё</button>
      </div>
    </section>
  );
};

export default MoviesCardList;
