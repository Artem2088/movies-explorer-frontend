import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import "./MoviesCardList.css";

const MoviesCardList = ({ isLoading, handlePostMovie, items }) => {
  const filmsFilter = JSON.parse(localStorage.getItem("filterData")) || [];

  return (
    <section className='cardList'>
      <ul className='cardList__container'>
        {isLoading ? (
          <Preloader />
        ) : (
          filmsFilter.map((obj) => (
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
