// Use require statements for importing modules
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

// Retrieve API key from environment variables
const apiKey = process.env.API_KEY;

// An async function to fetch the IDs of popular movies or TV shows based on the page number and a boolean flag
const fetchPopularIds = async (page, searchMovies) => {
  try {
    // Determine the URL based on whether we're searching for movies or TV shows
    const url = searchMovies
      ? `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&api_key=${apiKey}`
      : `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}&api_key=${apiKey}`;

    // Perform the API request using axios
    const response = await axios.get(url);
    // Extract the IDs from the results
    const results = response.data.results;
    const idList = results.map((result) => result.id);
    return idList;
  } catch (error) {
    console.error("Error: error happened for fetchPopularIds", error);
    return null;
  }
};

// A function to fetch the IDs of popular items across the first 10 pages
const fetchAllPopularIds = async (searchMovies) => {
  let allIds = [];
  for (let page = 1; page <= 10; page++) {
    try {
      const ids = await fetchPopularIds(page, searchMovies);
      if (ids) {
        allIds = allIds.concat(ids);
      }
    } catch (error) {
      console.error(`Error fetching items for page ${page}:`, error);
    }
  }
  return allIds;
};

// Fetch and log the IDs of popular movies and TV shows
fetchAllPopularIds(true).then((ids) => console.log(ids));
fetchAllPopularIds(false).then((ids) => console.log(ids));
