import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.API_KEY;

import { getPopularMovieIds } from "./movies_id.js";

const popularMovies = await getPopularMovieIds();

// this function takes an id and looks for the cast of the movie that is assigned to that Id in the TMDB API
const getMovieCast = async (movie_id) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${apiKey}`
    );
    const cast = response.data.cast; //we seperate the cast object from the credit response we get from the api
    return cast;
  } catch (error) {
    console.error("Error: error happend for getMovieCast", error);
    return null;
  }
};

//by using the gives the name of the movie that is assigned to the input Id in the tmdb api
const getMovieName = async (movie_id) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}`
    ); //calling for the general info of the movie
    const movieName = response.data.title; //seperating the title of the movie from the rest of the general info
    return movieName;
  } catch (error) {
    console.error("Error: error happend for getMovieTitle func", error);
    return null;
  }
};
