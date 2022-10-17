import { MOVIES_API } from "../utils/Constant";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`${res.status} ${res.statusText}`);
}

export const getMovies = async (movies) => {
  const res = await fetch(`${MOVIES_API}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movies),
  });
  return checkResponse(res);
};
