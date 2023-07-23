import React from 'react';

export const MovieList = (props) => {
  const FavouriteComponent = props.favouriteComponent;

  return (
    <div className="movie-list-container row row-cols-2 row-cols-md-4 g-4">
      {props.moviess.map((movie, index) => (
        <div key={movie.imdbID} className="col">
          <div className="image-container d-flex flex-column align-items-center ml-2">
            <img src={movie.Poster} alt="movie poster" />
            <div onClick={() => props.handleFavouritesClick(movie)} className="overlay d-flex align-items-center justify-content-center">
              <FavouriteComponent />
            </div>
            <div className="movie-info text-center mt-2">
              <h4>{movie.Title}</h4>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

