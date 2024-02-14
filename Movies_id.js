// In this file we will get the movie IDs of the most popular movies based on the TMDB APi.

import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.API_KEY;

let popularMovieIds = [];

// an async function with a page param that will fetch the popular movies in the given page
const fetchPopularMovies = async (page) => {
  try {
    // Await the axios call to complete to get the popular movies in the input page
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&api_key=${apiKey}`
    );
    const results = response.data.results; //all the movie objects that we get back from the API
    const idList = results.map((result) => result.id);
    return idList;
  } catch (error) {
    console.error("Error: error happend for fetchPopularMovies", error);
    return null;
  }
};

// gets the movie IDs of the movies in the first 10 pages of the most popular movies list
// using the fetchPopularMovies function and a for loop
const fetchAllPopularMovieIds = async () => {
  let allMovieIds = [];
  for (let page = 1; page <= 10; page++) {
    try {
      const ids = await fetchPopularMovies(page);
      if (ids) {
        allMovieIds = allMovieIds.concat(ids);
      }
    } catch (error) {
      console.error(`Error fetching movies for page ${page}:`, error);
    }
  }
  return allMovieIds;
};

fetchAllPopularMovieIds()
  .then((ids) => {
    popularMovieIds = ids;
  })
  .catch((error) => {
    popularMovieIds = null;
    console.error("there was an error at fetchAllPopularMovieIds:\n", error);
  });

export const getPopularMovieIds = async () => {
  return fetchAllPopularMovieIds(); // This function already fetches and returns all movie IDs
};
