// ! make unit tests for this module

// In this file we will get the movie IDs of the most popular movies based on the TMDB APi.

import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.API_KEY;

// an async function with a page param that will fetch the popular movies or tv shows in the given page
const fetchPopularIds = async (page: number, searchMovies: boolean) => {
  try {
    if (searchMovies) {
    }
    const response = searchMovies //see if the search movie param is true if it is it will return movies
      ? await axios.get(
          `"https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&api_key=${apiKey}`
        ) // and if it's false it will return popular tv shows
      : await axios.get(
          `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}&api_key=${apiKey}`
        );
    // Await the axios call to complete to get the popular movies in the input page
    const results = response.data.results; //all the movie objects that we get back from the API
    const idList = results.map((result: any) => result.id);
    return idList;
  } catch (error) {
    console.error("Error: error happend for fetchPopularIds", error);
    return null;
  }
};

// gets the movie/tv show IDs of the movies in the first 10 pages of the most popular movies list
// using the fetchPopularIds function and a for loop
export const fetchAllPopularIds = async (searchMovies: boolean) => {
  let allIds = [];
  for (let page = 1; page <= 10; page++) {
    try {
      const ids = await fetchPopularIds(page, searchMovies);
      if (ids) {
        allIds = allIds.concat(ids);
      }
    } catch (error) {
      console.error(`Error fetching movies for page ${page}:`, error);
    }
  }
  return allIds;
};

module.exports = fetchAllPopularIds;
