import React from 'react';

import "./selectedMovie.css"

function SelectedMovie({selectedMovie}){
    return(
        <div class="movie_card" id="bright">
            <div class="info_section">
            <img class="locandina" src={selectedMovie.image} alt=""/>
              <div class="movie_header">
                <h1>{selectedMovie.title}</h1>
                <h4>{selectedMovie.year}, {selectedMovie.directorList[0].name}, {selectedMovie.stars}</h4>
                <span class="minutes">117 min</span>
                <p class="type">{selectedMovie.genres}</p>
              </div>
              <div class="movie_desc">
                <p class="text">
                  {selectedMovie.plot}
                </p>
              </div>
            </div>
            <div class="blur_back bright_back"></div>
          </div>
    )
}

export default SelectedMovie;