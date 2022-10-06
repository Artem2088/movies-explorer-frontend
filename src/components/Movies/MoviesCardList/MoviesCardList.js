import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import "./MoviesCardList.css";

const MoviesCardList = ({ items, loading }) => {
  return (
    <section className='cardList'>
      {loading ? (
        <Preloader />
      ) : (
        <ul className='cardList__container'>
          {items.map((obj) => (
            <MoviesCard key={obj.id} {...obj} />
          ))}
        </ul>
      )}
      <div className='cardList__block'>
        <button className='cardList__plus'>Ещё</button>
      </div>
    </section>
  );
};

export default MoviesCardList;
