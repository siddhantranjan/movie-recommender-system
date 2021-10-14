import React, { useState } from 'react';
import axios from 'axios';

import singleMovie from "./singleMovie.json"
import "./movieCard.css";
import SelectedMovie from './selectedMovie';

function MovieCard({ movie }) {

  const [selectedMovie, setSelectedMovie] = useState({})
  const [similarMovies, setSimilarMovies] = useState([])

  function getMovieUsingTitle(id) {
    axios
      .get(`https://imdb-api.com/en/API/Title/k_dquc5zu0/${id}/FullActor,Posters,`)
      .then((response) => {
        console.log(response)
        setSelectedMovie(response.data)
      })
      .catch(function (error) {
        console.error(error);
      });
    //setSelectedMovie(singleMovie)
    getSimilarMoviesList(id)
  }

  async function getSimilarMoviesList(id) {
    axios
      .get(`http://127.0.0.1:5000/movie/${id}`, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      })
      .then((response) => {
        console.log("movieLIst <<<<<<<<<<<<<<<<<<", response.data.movieList)
        setSimilarMovies(response.data.movieList)
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  return (
    <div className="container">
      {
        Object.keys(selectedMovie).length ? <SelectedMovie selectedMovie={selectedMovie} /> : null
      }
      {similarMovies.length ? (
        similarMovies.map((movie) => (
          <div className="movie-card" onClick={() => getMovieUsingTitle(movie.id)}>
            <img className="movie-card__image" src={movie.image} alt="" />
            <div className="movie-card__text-wrapper">
              <h2 className="movie-card__title">{movie.title}</h2>
              <h3 className="movie-card_url">{movie.imDbRating}</h3>
              <div className="movie-card__post-date">{movie.year}</div>
              <div className="movie-card__details-wrapper">
                <p className="movie-card__excerpt">{movie.crew}</p>
              </div>
            </div>
          </div>
        ))
      ) : <div className="movie-card" onClick={() => getMovieUsingTitle(movie.id)}>
        <img className="movie-card__image" src={movie.image} alt="" />
        <div className="movie-card__text-wrapper">
          <h2 className="movie-card__title">{movie.title}</h2>
          <h3 className="movie-card_url">{movie.imDbRating}</h3>
          <div className="movie-card__post-date">{movie.year}</div>
          <div className="movie-card__details-wrapper">
            <p className="movie-card__excerpt">{movie.crew}</p>
          </div>
        </div>
      </div>}
    </div>
  )
}

export default MovieCard;