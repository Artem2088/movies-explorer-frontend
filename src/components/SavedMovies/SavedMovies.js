import React from "react";
import Footer from "../Footer/Footer";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesHeader from "../MoviesHeader/MoviesHeader";
import "./SavedMovies.css";
import movieCard from "../../images/image/movie1.png";

const SavedMovies = () => {
  return (
    <div className='savedMovies'>
      <MoviesHeader />
      <SearchForm />
      <div className='savedMovies__wraper'>
        <figure className='card'>
          <img
            src={movieCard}
            alt='изображение фильма'
            className='card__image'
          />
          <figcaption className='card__info'>
            <p className='card__title'>33 слова о дизайне</p>
            <div className='card__block'>
              <button className='savedMovies__unLike' />
            </div>
          </figcaption>
          <div className='card__counter'>1ч42м</div>
        </figure>
      </div>
      <Footer />
    </div>
  );
};

export default SavedMovies;
