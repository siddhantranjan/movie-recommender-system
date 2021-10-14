import React, { useState } from "react";
import axios from "axios";

import test from "./movieList.json";
import MovieCard from "./movieCard";

import "./home.css";

function Home() {
  const [movies, setMovies] = useState([]);
  const [value, setValue] = useState('search here')

  function getTopMovies() {
    axios
        .get(`https://imdb-api.com/en/API/Top250Movies/k_dquc5zu0`)
        .then((response) => {
            console.log(response.data);
            setMovies(response.data.items)
        })
        .catch(function (error) {
            console.error(error);
        });
    //setMovies(test.items)
  }
  function handleChange(event){
    setValue(event.target.value)
  }

  function getMovieByTitle(event) {
    axios
        .get(`https://imdb-api.com/en/API/Search/k_dquc5zu0/${value}`)
        .then((response) => {
            console.log(response.data.results);
            setMovies(response.data.results)
        })
        .catch(function (error) {
            console.error(error);
        });

    //setMovies(test.items.slice(12,19))
    event.preventDefault();
  }

  function home() {
    setMovies([])
  }
  return (
    <div>
      <button onClick={home} id="homeButton">
        Home
      </button>
      {movies.length ? (
        movies.slice(0,20).map((movie) => (
          <MovieCard key = {movie.id} movie={movie} />
        ))
      ) : (
        <div>
      <form class="form-wrapper cf" onSubmit={getMovieByTitle}>
        <input
          type="text"
          value={value} onChange={handleChange}
          required
          id="searchBox"
        />
        <button type="submit">Search</button>
      </form>
      <button id="getMovies" onClick={getTopMovies}>
        Top Movies
      </button>
          </div>
      )}
    </div>
  );
}
export default Home;
