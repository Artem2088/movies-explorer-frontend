import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import "./MoviesCardList.css";

const MoviesCardList = ({ items, isLoading }) => {
  return (
    <section className='cardList'>
      {isLoading ? (
        <Preloader />
      ) : (
        <ul className='cardList__container'>
          {items.map((items) => (
            <MoviesCard key={items.id} {...items} />
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
