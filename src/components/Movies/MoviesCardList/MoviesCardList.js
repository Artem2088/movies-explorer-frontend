import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
// import Preloader from "../Preloader/Preloader";
import "./MoviesCardList.css";

const MoviesCardList = () => {
  return (
    <section className='cardList'>
      <ul className='cardList__container'>
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        {/* <Preloader/>  работает-включить после второго ревью*/}
      </ul>
      <div className='cardList__block'>
        <button className='cardList__plus'>Ещё</button>
      </div>
    </section>
  );
};

export default MoviesCardList;
