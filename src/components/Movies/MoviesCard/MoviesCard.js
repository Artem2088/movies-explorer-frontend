import { React, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import cardLike from "../../../images/icon/icon-like1.svg";
import cardLikeActiv from "../../../images/icon/icon-like-red.svg";
import cardUnLike from "../../../images/icon/icon-disLike.svg";
import { MOVIES_URL } from "../../../utils/Constant";

const MoviesCard = ({ id, handlePostMovie, handleDeleteMovie, item }) => {
  function checkLike() {
    let result = JSON.parse(localStorage.getItem("postMovie")) || [];

    return Boolean(result.find((el) => el == id));
  }

  const [likeActiv, setlikeActiv] = useState(checkLike());

  const { pathname } = useLocation();

  const {
    country,
    director,
    year,
    description,
    image,
    thumbnail,
    nameRU,
    nameEN,
    duration,
    trailer,
    movieId,
  } = item;

  const postMovie = () => {
    handlePostMovie({
      country: country || "Не указано",
      director: director || "Не указано",
      duration: duration || 0,
      year: year || "Не указано",
      description: description || "Не указано",
      image:
        image || "https://bentizol.ru/assets/file-storage/images/blog-1_0.jpg",
      trailer:
        trailer && trailer.startsWith("http") ? trailer : "https://youtube.com",
      thumbnail:
        thumbnail ||
        "https://bentizol.ru/assets/file-storage/images/blog-1_0.jpg",
      nameRU: nameRU || "Не указано",
      nameEN: nameEN || "Не указано",
      movieId,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();

    // let like = !likeActiv;

    postMovie();

    // setlikeActiv(like);
  };

  const handleDelete = () => {
    handleDeleteMovie(id);
  };

  return (
    <li className='card'>
      <figcaption className='card__info'>
        <p className='card__title'>{nameRU}</p>
        <div className='card__counter'>{duration}</div>
        <div className='card__block'>
          <button className='card__button' onClick={handleClick}>
            {pathname == "/movies" ? (
              <img
                src={likeActiv ? cardLikeActiv : cardLike}
                alt='лайк'
                className='card__like'
              />
            ) : (
              <img
                src={cardUnLike}
                alt='дизлайк'
                className='card__like'
                onClick={handleDelete}
              />
            )}
          </button>
        </div>
      </figcaption>
      <img src={MOVIES_URL + image.url} alt={nameRU} className='card__image' />
    </li>
  );
};

export default MoviesCard;
