import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Movies.css";
import MoviesHeader from "../MoviesHeader/MoviesHeader";
import Footer from "../Footer/Footer";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import { getMovies } from "../../utils/MoviesApi";
import { getSaveMovies, postMovie, deleteMovie } from "../../utils/MainApi";
import { MOVIES_URL } from "../../utils/Constant";
import { MESSAGE_ERR } from "../../utils/Constant";

let MoviesData = [];

const Movies = ({ modal, isLoggedIn }) => {
  const [Movies, setMovies] = useState(
    JSON.parse(localStorage.getItem("search_result")) || []
  );
  const [savedMovies, setSavedMovies] = useState(
    JSON.parse(localStorage.getItem("saved_movies_search_result")) || []
  );
  const [err, setErr] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [short, setShort] = useState(parseInt(localStorage.getItem("short")));
  const [savedShort, setSavedShort] = useState(
    parseInt(localStorage.getItem("saved_short"))
  );
  const { pathname } = useLocation();
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (pathname === "/movies") {
      return setShort(parseInt(localStorage.getItem("short")));
    }

    if (pathname === "/saved-movies") {
      return setSavedShort(0);
    }
  }, [pathname]);

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
        if (data) {
          setMovies(JSON.parse(localStorage.getItem("search_result")) || []);
        }
      }
    );
  };

  const removeSaved = (movieId) => {
    deleteMovie(movieId, (data) => {
      if (data.status?.acknowledged) {
        let saved_movies = [...Movies];
        saved_movies = saved_movies.filter((el) => el.movieId != movieId);
        setMovies(saved_movies);

        setSavedMovies(saved_movies);
        localStorage.setItem(
          "saved_movies_search_result",
          JSON.stringify(saved_movies)
        );
      }
    });
  };

  useEffect(() => {
    getSaveMovies((data) => {
      if (pathname === "/saved-movies") {
        let savedMovies =
          JSON.parse(localStorage.getItem("saved_movies_search_result")) || [];

        if (!savedMovies.length) {
          setMovies([]);
          setSavedMovies([]);
        } else {
          setMovies(
            JSON.parse(localStorage.getItem("saved_movies_search_result")) || []
          );
          setSavedMovies(
            JSON.parse(localStorage.getItem("saved_movies_search_result")) || []
          );
        }
      }

      if (pathname === "/movies") {
        let movies = JSON.parse(localStorage.getItem("search_result") || []);

        if (!movies.length) {
          setMovies([]);
        } else {
          setMovies(movies);
        }
      }
    });
  }, [pathname]);

  useEffect(() => {
    filterShort();
  }, [short, savedShort]);

  const filterShort = (data = Movies) => {
    let result = [...data];

    if (pathname === "/movies") {
      if (short) {
        result = data.filter((el) => el.duration < 40);
      }

      localStorage.setItem("search_result", JSON.stringify(result));
      localStorage.setItem("short", short ? 1 : 0);
      setMovies(result);
    } else {
      if (savedShort) {
        result = savedMovies.filter((el) => el.duration < 40);

        localStorage.setItem(
          "saved_movies_search_result",
          JSON.stringify(result)
        );
        setMovies(result);
      } else {
        localStorage.setItem(
          "saved_movies_search_result",
          JSON.stringify(savedMovies)
        );
        setMovies(result);
      }

      localStorage.setItem("saved_short", savedShort ? 1 : 0);
    }
  };

  const filterMovies = (film) => {
    if (pathname === "/movies") {
      let result = MoviesData.filter((el) =>
        el.nameRU.toLowerCase().includes(film.toLowerCase())
      );

      if (short) {
        filterShort(result);
      } else {
        localStorage.setItem("search_result", JSON.stringify(result));
        setMovies(result);
      }
    } else {
      let result = savedMovies.filter((el) =>
        el.nameRU.toLowerCase().includes(film.toLowerCase())
      );

      if (savedShort) {
        filterShort(result);
      } else {
        setMovies(result);
        localStorage.setItem(
          "saved_movies_search_result",
          JSON.stringify(result)
        );
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
        setErr(MESSAGE_ERR.beatFilmErr);
      }
    });
  };

  return (
    <>
      <main className='movies'>
        <MoviesHeader logedIn={isLoggedIn} />
        <SearchForm
          modal={modal}
          searchAction={searchMovies}
          short={pathname === "/movies" ? setShort : setSavedShort}
          short_status={pathname === "/movies" ? short : savedShort}
        />
        <MoviesCardList
          items={Movies}
          loading={isLoading}
          err={err}
          add_saved={addSaved}
          remove_saved={removeSaved}
          SavedData={savedMovies}
          setSavedData={setSavedMovies}
        />
        <Footer />
      </main>
    </>
  );
};

export default Movies;
