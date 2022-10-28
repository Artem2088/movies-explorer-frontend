import { MOVIES_API } from "../utils/Constant";

export const getMovies = async (callback) => {
  try {
    const res = await fetch(`${MOVIES_API}`);
    const data = await res.json();

    callback(data);
  } catch (err) {
    callback(err);
  }
};
