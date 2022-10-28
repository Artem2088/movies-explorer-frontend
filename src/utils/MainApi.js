import { MAIN_API } from "../utils/Constant";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`${res.status} ${res.statusText}`);
}

export const getUserInfo = async () => {
  const res = await fetch(`${MAIN_API}/users/me`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    },
  });
  return checkResponse(res);
};

export const register = async (name, email, password) => {
  const res = await fetch(`${MAIN_API}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });
  return checkResponse(res);
};

export const login = async (email, password) => {
  const res = await fetch(`${MAIN_API}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return checkResponse(res);
};

export const checkToken = async (jwt) => {
  const res = await fetch(`${MAIN_API}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
  return checkResponse(res);
};

export const getUsersMe = async (user) => {
  const res = await fetch(`${MAIN_API}/users/me`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
  });
  return checkResponse(res);
};

export const patchUserMe = async (name, email) => {
  const res = await fetch(`${MAIN_API}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email }),
  });
  return checkResponse(res);
};

export const getSaveMovies = async (callback) => {
  const res = await fetch(`${MAIN_API}/movies`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    },
  });

  let data = await res.json();
  callback(data);
};

export const postMovie = async (send_data, callback) => {
  try {
    const res = await fetch(`${MAIN_API}/movies`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(send_data),
    });

    let data = await res.json();
    callback(data);
  } catch (err) {
    callback(err);
  }
};

export const deleteMovie = async (movieId, callback) => {
  const res = await fetch(`${MAIN_API}/movies/${movieId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    },
  });

  let data = await res.json();

  callback(data);
};
