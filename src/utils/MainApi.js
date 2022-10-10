import { MAIN_API } from "../utils/Constant";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`${res.status} ${res.statusText}`);
}

export const postMovie = (
  country,
  director,
  duration,
  year,
  description,
  image,
  trailerLink,
  thumbnail,
  movieId,
  nameRU,
  nameEN
) => {
  return fetch(`${MAIN_API}/movies`, {
    metod: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    }),
  }).then(checkResponse);
};

export const deleteMovie = (movie) => {
  return fetch(`${MAIN_API}/movies/:movieId`, {
    metod: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ movie }),
  }).then(checkResponse);
};
