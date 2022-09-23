import React from "react";
import "./MoviesCard.css";
import movieCard from "../../../images/image/movie1.png";

const MoviesCard = () => {
  return (
    <figure className='card'>
      <img src={movieCard} alt='изображение фильма' className='card__image' />
      <figcaption className='card__info'>
        <p className='card__title'>33 слова о дизайне</p>
        <div className='card__block'>
          <button className='card__like' />
        </div>
      </figcaption>
      <div className='card__counter'>1ч42м</div>
    </figure>
  );
};

export default MoviesCard;
