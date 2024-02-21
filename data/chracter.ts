import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

import { fetchAllPopularIds } from "./movies_id.js";

const apiKey = process.env.API_KEY;

// this function takes an id and looks for the cast of the movie that is assigned to that Id in the TMDB API
const getCast = async (id: number, searchMovie: boolean) => {
  try {
    const response = searchMovie
      ? await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`
        )
      : await axios.get(
          `https://api.themoviedb.org/3/tv/${id}/credits?language=en-US?api_key=${apiKey}`
        );
    const cast = response.data.cast; //we seperate the cast object from the credit response we get from the api
    return cast;
  } catch (error) {
    console.error("Error: error happend for getCast", error);
    return null;
  }
};

//by using the gives the name of the movie that is assigned to the input Id in the tmdb api
const getDetails = async (id: number, searchMovie: boolean) => {
  try {
    const response = searchMovie
      ? await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
        )
      : await axios.get(
          `https://api.themoviedb.org/3/tv/${id}?language=en-US&api_key=${apiKey}`
        ); //calling for the general info of the movie/move based on the param
    const Details = response.data;
    return Details;
  } catch (error) {
    console.error("Error: error happend for getDetails func", error);
    return null;
  }
};

// in this function we will take an string input that is a movie/tv show chracter and look throug the 200 most popular
// movies/tv and return the first movies/tv that the chracter has played in it
export const getChracterMovie = async (
  chracter: string,
  searchMovie: boolean
) => {
  const popularIds = await fetchAllPopularIds(searchMovie).catch((error) => {
    console.error("Error fetching popular IDs:", error);
    return null;
  }); //I use the popularIds module to get the popular Ids of the movies/tv shows based on search movies
  const inputChracter = chracter.toLowerCase();
  let mostPopularResult;
  try {
    if (popularIds !== null) {
      for (const movie of popularIds) {
        const movieCast = await getCast(movie, searchMovie);
        for (const actor of movieCast) {
          const uniformActor = actor.character.toLowerCase(); //this the actor string in lowerCase
          if (uniformActor.includes(inputChracter)) {
            mostPopularResult = {
              actor: actor,
              movieDetail: await getDetails(movie, searchMovie),
            };
            return mostPopularResult;
          }
        }
      }
      console.log(
        "there was no such chracter in the  200 most popular movies perhaps the chracter is deeper or the chracter is spelled wrong"
      );
      return null;
    } else {
      console.error("there is a problem at fetchAllPopularIds");
      return null;
    }
  } catch (error) {
    console.error("there was an erroe in teh get chracter function :", error);
    return null;
  }
};
