import React, { useState } from "react";
import { getChracterMovie } from "./data/character";

const CharacterMovieSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<any | null>(null); // To store the fetched results
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const [searchMovie, setSearchMovie] = useState(true); // Toggle between movies and TV shows

  const handleSearch = async () => {
    setIsLoading(true);
    const result = await getChracterMovie(searchTerm, searchMovie);
    setResults(result);
    setIsLoading(false);
  };

  const handleBack = () => {
    setSearchTerm("");
    setResults(null);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {!results ? (
        <div>
          <h2>Search for a Character's Movies/TV Shows</h2>
          <input
            type="text"
            placeholder="Enter character name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: "10px", width: "300px", marginBottom: "10px" }}
          />
          <div>
            <label>
              <input
                type="radio"
                value="movie"
                checked={searchMovie}
                onChange={() => setSearchMovie(true)}
              />
              Movies
            </label>
            <label style={{ marginLeft: "10px" }}>
              <input
                type="radio"
                value="tv"
                checked={!searchMovie}
                onChange={() => setSearchMovie(false)}
              />
              TV Shows
            </label>
          </div>
          <button
            onClick={handleSearch}
            disabled={isLoading || !searchTerm.trim()}
            style={{
              padding: "10px 20px",
              marginTop: "10px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={handleBack}
            style={{
              padding: "10px 20px",
              backgroundColor: "#DC3545",
              color: "white",
              border: "none",
              cursor: "pointer",
              marginBottom: "20px",
            }}
          >
            Back
          </button>
          {results ? (
            <div>
              <h2>Character Found!</h2>
              <p>
                <strong>Actor:</strong> {results.actor.name}
              </p>
              <p>
                <strong>Character:</strong> {results.actor.character}
              </p>
              <p>
                <strong>Movie/TV Show:</strong>{" "}
                {results.movieDetail.title || results.movieDetail.name}
              </p>
              <p>
                <strong>Overview:</strong> {results.movieDetail.overview}
              </p>
              <p>
                <strong>Release Date:</strong>{" "}
                {results.movieDetail.release_date ||
                  results.movieDetail.first_air_date}
              </p>
            </div>
          ) : (
            <p>No character found in the 200 most popular movies/TV shows.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CharacterMovieSearch;
