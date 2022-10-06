import React from "react";
import "./MoviesCard.css";
import cardLike from "../../../images/icon/icon-like1.svg";
import cardUnLike from "../../../images/icon/icon-disLike.svg";

const MoviesCard = (items) => {
  const url = " https://api.nomoreparties.co/";
  return (
    <li className='card'>
      <figcaption className='card__info'>
        <p className='card__title'>{items.nameRU}</p>
        <div className='card__counter'>{items.duration}</div>
        <div className='card__block'>
          <button className='card__button'>
            <img src={cardLike} alt='лайк' className='card__like' />
            {/* кнопка будет меняться в зависимости от состояния и расположения */}
            <img src={cardUnLike} alt='дизлайк' className='card__disLike' />
          </button>
        </div>
      </figcaption>
      <img
        src={url + items.image.url}
        alt={items.nameRU}
        className='card__image'
      />
    </li>
  );
};

export default MoviesCard;
