import { React, useState, useEffect } from "react";
import "./MoviesCard.css";
import cardLike from "../../../images/icon/icon-like1.svg";
import cardLikeActiv from "../../../images/icon/icon-like-red.svg";
import cardUnLike from "../../../images/icon/icon-disLike.svg";
import { MOVIES_URL } from "../../../utils/Constant";

const MoviesCard = (props, { obj }) => {
  const [likeActiv, setlikeActiv] = useState(false);
  const [postMovie, setPostMovie] = useState([]);

  useEffect(() => {
    setlikeActiv(false);
    setPostMovie(postMovie);
  }, []);

  const handleActiv = () => {
    setlikeActiv(true);
  };

  const onClick = () => {
    handleActiv();
  };

  const handleSubmit = (e) => {
    onClick();
    e.preventDefault();
    props.handlePostMovie();
  };

  return (
    <li className='card'>
      <figcaption className='card__info'>
        <p className='card__title'>{obj.nameRU}</p>
        <div className='card__counter'>{obj.duration}</div>
        <div className='card__block'>
          <button
            type='submit'
            className='card__button'
            onClick={(e) => {
              handleSubmit(e);
            }}
            // likeActiv={likeActiv}
          >
            <img
              src={likeActiv ? cardLikeActiv : cardLike}
              alt='лайк'
              className='card__like'
            />
            {/* кнопка будет меняться в зависимости от состояния и расположения */}
            <img src={cardUnLike} alt='дизлайк' className='card__disLike' />
          </button>
        </div>
      </figcaption>
      <img
        src={MOVIES_URL + obj.image.url}
        alt={obj.nameRU}
        className='card__image'
      />
    </li>
  );
};

export default MoviesCard;
