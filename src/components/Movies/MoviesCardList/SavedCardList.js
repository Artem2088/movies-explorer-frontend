import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import "./MoviesCardList.css";

const MoviesCardList = ({
  items,
  isLoading,
  handlePostMovie,
  postMovie,
  handleDeleteMovie,
}) => {
  const Films = JSON.parse(localStorage.getItem("films")) || [];
  const Favorites = JSON.parse(localStorage.getItem("postMovie")) || [];

  let resultFilms = [];

  Favorites.forEach((el) => {
    let inx = Films.findIndex((film) => film.id == el);
    if (inx != -1) resultFilms.push(Films[inx]);
  });

  return (
    <section className='cardList'>
      <ul className='cardList__container'>
        {isLoading ? (
          <Preloader />
        ) : (
          resultFilms.map((obj) => (
            <MoviesCard
              key={obj.id}
              {...obj}
              handlePostMovie={handlePostMovie}
              handleDeleteMovie={handleDeleteMovie}
              resultFilms={resultFilms}
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
