import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MovieList } from './components/MovieList';
import { MovieListHeading } from './components/MovieListHeading';
import { Search } from './components/Search';
import { AddFavourite } from './components/AddFavourite';
import { RemoveFavourites } from './components/RemoveFavourite';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState([]);
  const api_key = '';

  // fetch the default movie data
  const getDefaultMovies = async () => {
    const defaultUrl = `http://www.omdbapi.com/?s=avengers&apikey=${api_key}`;
    const response = await fetch(defaultUrl);
    const responseJson = await response.json();
    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getDefaultMovies();
  }, []);


  // fetch search movie data
  const getMovieRequest = async () => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=${api_key}`;
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(localStorage.getItem('react-movie-app-favourites'));
    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter((favourite) => favourite.imdbID !== movie.imdbID);
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  return (
    <>
      <div className='container-fluid movie-app'>
        <div className="row d-flex align-items-center mt-4 mb-4">
          <MovieListHeading heading="Movieverse" />
          <Search searchValue={searchValue} setSearchValue={setSearchValue} />
        </div>

        <div className="row">
          <MovieList
            moviess={movies}
            handleFavouritesClick={addFavouriteMovie}
            favouriteComponent={AddFavourite}
          />
        </div>

        <div className="row">
          <div className="col">
            <div className="row d-flex align-items-center mt-4 mb-4">
              <MovieListHeading heading="Favourites" />
            </div>
            <div className="row">
              <MovieList
                moviess={favourites}
                handleFavouritesClick={removeFavouriteMovie}
                favouriteComponent={RemoveFavourites}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
