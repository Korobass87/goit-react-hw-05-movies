import axios from "axios";

const URL = "https://api.themoviedb.org/3";
const KEY = "9fce1b36a65b64769568def95d463865";

export const apiFavMov = () =>
  axios.get(`${URL}/trending/movie/week?api_key=${KEY}`);

export const apiSearchMov = (query, page) =>
  axios.get(`${URL}/search/movie?api_key=${KEY}&query=${query}&page=${page}`);

export const apiId = (movieId) =>
  axios.get(`${URL}/movie/${movieId}?api_key=${KEY}`);

export const apiMovCredit = (movieId) =>
  axios.get(`${URL}/movie/${movieId}/credits?api_key=${KEY}`);

export const apiMovReviews = (movieId) =>
  axios.get(`${URL}/movie/${movieId}/reviews?api_key=${KEY}`);