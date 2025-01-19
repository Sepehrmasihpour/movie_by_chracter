import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;

// an async function with a page param that will fetch the popular movies or tv shows in the given page
const fetchPopularIds = async (page: number, searchMovies: boolean) => {
  try {
    const response = searchMovies
      ? await axios.get(
          `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&api_key=${apiKey}`
        )
      : await axios.get(
          `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}&api_key=${apiKey}`
        );

    const results = response.data?.results;
    if (!results || !Array.isArray(results)) {
      console.error("Invalid API response:", response.data);
      return [];
    }

    return results.map((result: any) => result.id);
  } catch (error) {
    console.error("Error: error happened for fetchPopularIds", error);
    return null;
  }
};

// gets the movie/tv show IDs of the movies in the first 10 pages of the most popular movies list
// using the fetchPopularIds function and a for loop
export const fetchAllPopularIds = async (searchMovies: boolean) => {
  let allIds: any = [];
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
