import React from "react";
import "./MoviesCard.css";
import movieCard from "../../../images/image/movie1.png";
import cardLike from "../../../images/icon/icon-like1.svg";
import cardUnLike from "../../../images/icon/icon-disLike.svg";

const MoviesCard = () => {
  return (
    <figure className='card'>
      <figcaption className='card__info'>
        <p className='card__title'>33 слова о дизайне</p>
        <div className='card__counter'>1ч42м</div>
        <div className='card__block'>
          <button className='card__button'>
            <img src={cardLike} alt='лайк' className='card__like' />
            {/* кнопка будет меняться в зависимости от состояния и расположения */}
            <img src={cardUnLike} alt='дизлайк' className='card__disLike' />
          </button>
        </div>
      </figcaption>
      <img src={movieCard} alt='изображение фильма' className='card__image' />
    </figure>
  );
};

export default MoviesCard;
