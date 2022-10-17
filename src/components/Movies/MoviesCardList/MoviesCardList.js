import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import "./MoviesCardList.css";

const MoviesCardList = ({ items, isLoading, handlePostMovie, postMovie }) => {
  const pathname = useLocation();
  const [itemsFilm, setItemFilm] = useState(false);
  const [postFilm, setPostFilm] = useState(false);

  useEffect(() => {
    if (pathname === "/saved-movies") {
      return setPostFilm(true);
    }

    setItemFilm(true);
  }, []);

  const renderMovieList = () => {
    if (itemsFilm) {
      items.map((obj) => <MoviesCard key={obj.id} {...obj} />);
    }
    if (postFilm) {
      postMovie.map((obj) => (
        <MoviesCard
          key={obj.id}
          {...obj}
          handlePostMovie={handlePostMovie}
          postMovie={postMovie}
        />
      ));
    }
  };

  return (
    <section className='cardList'>
      <ul className='cardList__container'>
        {isLoading ? <Preloader /> : renderMovieList()}
      </ul>
      <div className='cardList__block'>
        <button className='cardList__plus'>Ещё</button>
      </div>
    </section>
  );
};

export default MoviesCardList;
