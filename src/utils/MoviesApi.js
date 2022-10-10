import { MOVIES_API } from "../utils/Constant";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`${res.status} ${res.statusText}`);
}

export const getMovies = (movies) => {
  return fetch(`${MOVIES_API}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movies),
  }).then(checkResponse);
};
