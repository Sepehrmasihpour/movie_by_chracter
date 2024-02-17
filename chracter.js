import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

import { getPopularMovieIds } from "./movies_id.js";

const apiKey = process.env.API_KEY;

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
const getMoviedetails = async (movie_id) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}`
    ); //calling for the general info of the movie
    const movieDetails = response.data; //seperating the title of the movie from the rest of the general info
    return movieDetails;
  } catch (error) {
    console.error("Error: error happend for getMovieTitle func", error);
    return null;
  }
};

// in this function we will take an string input that is a movie chracter and look throug the 200 most popular
// movies and return the first movies that the chracter has played in it
const getChracterMovie = async (movieChracter) => {
  const popularMoviesIds = await getPopularMovieIds();
  const inputChracter = movieChracter.toLowerCase();
  let mostPopularResult;
  try {
    for (const movie of popularMoviesIds) {
      const movieCast = await getMovieCast(movie);
      for (const actor of movieCast) {
        const uniformActor = actor.character.toLowerCase(); //this the actor string in lowerCase
        if (uniformActor.includes(inputChracter)) {
          mostPopularResult = {
            actor: actor,
            movieDetail: await getMoviedetails(movie),
          };
          return mostPopularResult;
        }
      }
    }
    console.log(
      "there was no such chracter in the  200 most popular movies perhaps the chracter is deeper or the chracter is spelled wrong"
    );
    return null;
  } catch (error) {
    console.error("there was an erroe in teh get chracter function :", error);
    return null;
  }
};

console.log(await getChracterMovie("ben"));
