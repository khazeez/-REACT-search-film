import { useEffect, useState } from 'react'
import './App.css'
import {getMovieList, searchMovie, getDetailMovie} from './api'

function App() {
  // State for both original and limited movie list
  const [originalMovieList, setOriginalMovieList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    getMovieList().then((results) => {
      setOriginalMovieList(results); // Save the full movie list
      setMovieList(results);         // Initially, movieList is the full list
    });
  }, []);

  useEffect(() => {
    getDetailMovie()
  }, [])

  const PopularMovieList = () => {
    return movieList.map((movie, i) => {
      return (
        <div className="movie-wrapper" key={i} >
          <div className="movie-title">{movie.title}</div>
          <img className='poster' src={`${import.meta.env.VITE_BASEIMGURL}/${movie.poster_path}`} alt={movie.title} />
          <div className="movie-date">Movie release: {movie.release_date}</div>
          <div className="movie-rate">Rating: {movie.vote_average}</div>
        </div>
      );
    });
  };

  // Search function
  const search = async ({ q }) => {
    if (q.length > 0) {
      const result = await searchMovie(q);
      setMovieList(result); // Show search results
  
      
    } else {
      // If the search input is cleared, restore the original list
      setMovieList(originalMovieList);
    }
  };

  // Limit function using the original movie list
  const limit = ({ q }) => {
    if (q > 0) {
      const result = originalMovieList.slice(0, q); // Slice from the original list
      setMovieList(result); // Update the movie list with limited results
    } else {
      // If no limit is specified, restore the full list
      setMovieList(originalMovieList);
    }
  };

  const TotalMovie = () => {
    const total = movieList.length;
    return (
      <div className="movie-displayed">
        Result: {total}
      </div>
    );
  };

  const DetailMovie = (id) => {
    getDetailMovie(i)
  }

  return (
    <>
      <div>
        <header className='header'>
          <h1 className='title-bar'>Search Your Movie</h1>
          <div className="search">
            <input
              type='text'
              placeholder="cari film kesukaanmu"
              className='movie-search'
              onChange={({ target }) => search({ q: target.value })}
            />
          </div>
          <h3><TotalMovie /></h3>
          <div className="limit">
          <input
            className='limit-movie'
            type="text"
            placeholder=" Set limit movie displayed"
            onChange={({ target }) => limit({ q: Number(target.value) })}
          />
          </div>
        </header>
        <div className="movie-container">
          <PopularMovieList />
        </div>
      </div>
    </>
  );
}

export default App;
