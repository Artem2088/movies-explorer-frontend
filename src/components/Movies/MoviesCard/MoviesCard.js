import { React, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import cardLike from "../../../images/icon/icon-like1.svg";
import cardLikeActiv from "../../../images/icon/icon-like-red.svg";
import cardUnLike from "../../../images/icon/icon-disLike.svg";
import { MOVIES_URL } from "../../../utils/Constant";

const MoviesCard = (obj) => {
  const handleClick = () => {
    window.open(obj.trailerLink);
  };
  const { pathname } = useLocation();
  const [like, setLike] = useState(false);

  useEffect(() => {
    getImageURL(obj);
  }, []);

  useEffect(() => {
    getLike();
  }, []);

  const getImageURL = (obj) => {
    if (!obj.image.url) {
      return obj.image;
    }

    return pathname === "/movies" ? MOVIES_URL + obj.image.url : obj.image;
  };

  const getLike = () => {
    return Boolean(obj.savedData.find((el) => el.movieId == obj.id));
  };

  const addSaved = (obj) => {
    obj.add_saved(obj);
    let newSavedFilmArray = [
      ...obj.savedData,
      { ...obj, movieId: obj.id, image: MOVIES_URL + obj.image.url },
    ];
    obj.setSavedData(newSavedFilmArray);
    setLike(!like);
  };

  const removeSaved = (id) => {
    let newSavedArray = obj.savedData.filter(
      (savedFilm) => savedFilm.movieId !== id
    );
    obj.setSavedData(newSavedArray);
    setLike(!like);
  };

  return (
    <li className='card'>
      <figcaption className='card__info'>
        <p className='card__title'>{obj.nameRU}</p>
        <div className='card__counter'>{obj.duration}</div>
        <div className='card__block'>
          {pathname == "/movies" && !getLike() ? (
            <button className='card__button' onClick={() => addSaved(obj)}>
              <img src={cardLike} alt='лайк' className='card__like' />
            </button>
          ) : pathname == "/movies" && getLike() ? (
            <button
              className='card__button'
              onClick={() => removeSaved(obj.id)}
            >
              <img src={cardLikeActiv} alt='лайк' className='card__like' />
            </button>
          ) : pathname == "/saved-movies" ? (
            <button
              className='card__button'
              onClick={() => obj.remove_saved(obj.movieId)}
            >
              <img src={cardUnLike} alt='лайк' className='card__like' />
            </button>
          ) : null}
        </div>
      </figcaption>
      <img
        src={getImageURL(obj)}
        alt={obj.nameRU}
        className='card__image'
        onClick={handleClick}
        title={"trailerLink"}
      />
    </li>
  );
};

export default MoviesCard;
