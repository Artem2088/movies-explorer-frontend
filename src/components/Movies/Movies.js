import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Movies.css";
import MoviesHeader from "../MoviesHeader/MoviesHeader";
import Footer from "../Footer/Footer";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import { getMovies } from "../../utils/MoviesApi";
import { getSaveMovies, postMovie, deleteMovie } from "../../utils/MainApi";
import { MOVIES_URL } from "../../utils/Constant";

let MoviesData = [];
let SavedData = [];

const Movies = ({ user }) => {
  const [Movies, setMovies] = useState(
    JSON.parse(localStorage.getItem("search_result")) || []
  );

  const [err, setErr] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [short, setShort] = useState(+localStorage.getItem("short"));

  const addSaved = (movie) => {
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
      trailerLink,
      id,
    } = movie;
    postMovie(
      {
        country: country || "Не указано",
        director: director || "Не указано",
        duration: duration || 0,
        year: year || "Не указано",
        description: description || "Не указано",
        image:
          MOVIES_URL + image.url ||
          "https://djkazu.supervinyl.net/application/files/9914/6139/6114/diary_detail_no_image.png",
        trailerLink:
          trailerLink && trailerLink.startsWith("http")
            ? trailerLink
            : "https://youtube.com",
        thumbnail:
          thumbnail ||
          "https://djkazu.supervinyl.net/application/files/9914/6139/6114/diary_detail_no_image.png",
        nameRU: nameRU || "Не указано",
        nameEN: nameEN || "Не указано",
        movieId: id,
      },
      (data) => {
        // if (data) {
        //   console.log(data);
        //   setMovies(JSON.parse(localStorage.getItem("search_result")) || []);
        // }
      }
    );
  };

  const removeSaved = (movieId) => {
    deleteMovie(movieId, (data) => {
      if (data.status?.acknowledged) {
        let saved_movies = [...Movies];
        saved_movies = saved_movies.filter((el) => el.movieId != movieId);
        setMovies(saved_movies);
      }
    });
  };

  const { pathname } = useLocation();

  useEffect(() => {
    getSaveMovies((data) => {
      SavedData = data;

      if (pathname == "/saved-movies") setMovies(SavedData);
      else setMovies(JSON.parse(localStorage.getItem("search_result")) || []);
    });
  }, [pathname]);

  useEffect(() => {
    filterShort();
  }, [short]);

  const filterShort = (data = Movies) => {
    let result = [...data];

    if (short) result = data.filter((el) => el.duration < 40);
    if (pathname == "/movies") {
      localStorage.setItem("search_result", JSON.stringify(result));
      localStorage.setItem("short", short ? 1 : 0);
    } else {
      localStorage.setItem("searchSave_result", JSON.stringify(result));
      localStorage.setItem("shortSave", short ? 1 : 0);
    }

    setMovies(result);
  };

  const filterMovies = (film) => {
    if (pathname == "/movies") {
      let result = MoviesData.filter((el) =>
        el.nameRU.toLowerCase().includes(film.toLowerCase())
      );

      if (short) filterShort(result);
      else {
        localStorage.setItem("search_result", JSON.stringify(result));

        setMovies(result);
      }
    } else if (pathname == "/saved-movies") {
      let result = SavedData.filter((el) =>
        el.nameRU.toLowerCase().includes(film.toLowerCase())
      );

      if (short) filterShort(result);
      else {
        localStorage.setItem("searchSave_result", JSON.stringify(result));

        setMovies(result);
      }
    }
  };

  const searchMovies = (film) => {
    setLoading(true);

    getMovies((data) => {
      setLoading(false);

      if (data.length) {
        MoviesData = [...data];

        filterMovies(film);
      } else {
        setErr(`
        Во время запроса произошла ошибка. Возможно, проблема с соединением
        или сервер недоступен. Подождите немного и попробуйте ещё раз
        `);
      }
    });
  };

  return (
    <>
      <main className='movies'>
        <MoviesHeader />
        <SearchForm
          searchAction={searchMovies}
          short={setShort}
          short_status={short}
        />
        <MoviesCardList
          items={Movies}
          loading={isLoading}
          err={err}
          add_saved={addSaved}
          remove_saved={removeSaved}
          SavedData={SavedData}
        />
        <Footer />
      </main>
    </>
  );
};

export default Movies;
