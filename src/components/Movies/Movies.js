import { useEffect, useState, useContext } from "react";
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
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

let moviesData = [];

const Movies = ({ modal, isLoggedIn }) => {
  const [Movies, setMovies] = useState(
    JSON.parse(localStorage.getItem("search_result")) || []
  );
  const [savedMovies, setSavedMovies] = useState([]);
  const [err, setErr] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [short, setShort] = useState(
    parseInt(localStorage.getItem("short")) || 0
  );
  const [savedShort, setSavedShort] = useState(0);
  const { pathname } = useLocation();
  const [step, setStep] = useState(1);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (pathname === "/movies") {
      setMovies(JSON.parse(localStorage.getItem("search_result")) || []);
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
        // let saved_movies = [...Movies];
        let saved_movies = [...savedMovies];
        saved_movies = saved_movies.filter((el) => el.movieId != movieId);
        setMovies(saved_movies);

        setSavedMovies(saved_movies);
      }
    });
  };

  const getSaveMoviesAll = () => {
    getSaveMovies((data) => {
      if (!data.length) {
        setSavedMovies([]);
      }
      let saved_movies = [...savedMovies];
      saved_movies = saved_movies.filter((el) => el.owner === currentUser);

      setSavedMovies(saved_movies);
      // setSavedMovies(data);
    });
  };

  useEffect(() => {
    getSaveMoviesAll();
  }, []);

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
        setMovies(result);
      }
    }
  };

  const filterMovies = (film) => {
    if (pathname === "/movies") {
      let result = moviesData.filter((el) =>
        el.nameRU.toLowerCase().includes(film.toLowerCase())
      );

      if (short) {
        filterShort(result);
      } else {
        localStorage.setItem("search_result", JSON.stringify(result));
        setMovies(result);
      }
    }
    if (pathname === "/saved-movies") {
      let result = savedMovies.filter((el) =>
        el.nameRU.toLowerCase().includes(film.toLowerCase())
      );
      if (savedShort) {
        filterShort(result);
      } else {
        setMovies(result);
      }
    }
  };

  const searchMovies = (film) => {
    setLoading(true);

    getMovies((data) => {
      setLoading(false);

      if (data.length) {
        moviesData = [...data];

        filterMovies(film);
      } else {
        return setErr(MESSAGE_ERR.beatFilmErr);
      }
    });
    setStep(1);
  };

  return (
    <>
      <main className='movies'>
        <MoviesHeader logedIn={isLoggedIn} />
        <SearchForm
          modal={modal}
          searchAction={
            pathname === "/movies" ? searchMovies : getSaveMoviesAll
          }
          short={pathname === "/movies" ? setShort : setSavedShort}
          short_status={pathname === "/movies" ? short : savedShort}
        />
        <MoviesCardList
          items={pathname === "/movies" ? Movies : savedMovies}
          loading={isLoading}
          err={err}
          add_saved={addSaved}
          remove_saved={removeSaved}
          savedData={savedMovies}
          setSavedData={setSavedMovies}
          step={step}
          setStep={setStep}
        />
        <Footer />
      </main>
    </>
  );
};

export default Movies;
