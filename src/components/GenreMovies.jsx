import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import MovieCard from './MovieCard';
import MoviesPagination from './MoviesPagination';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';

const GenreMovies = () => {
  const { genreId, genreName } = useParams();
  const [movieList, setMovieList] = useState([]);
  const [moviesPagination, setMoviesPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const API_BASE_URL = 'https://api.themoviedb.org/3';
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  };


  const fetchMoviesByGenre = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?with_genres=${genreId}&page=${currentPage}`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Failed to fetch movies by genre!');
      }

      const data = await response.json();

      if (data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);
      setMoviesPagination(data);
    } catch (error) {
      console.log(`Error fetching movies by genre: ${error}`);
      setErrorMessage('Error fetching movies, something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMoviesByGenre();
  }, [genreId, currentPage]);

  const handleGoBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <main>
      <div className='pattern' />
      <div className='wrapper'>
        <header className="genre-header">
          <button
            className='movie-back-button text-white flex items-center cursor-pointer border-none bg-transparent'
            onClick={handleGoBack}
          >
            <LazyLoadImage src="/left-arrow.svg" alt="Arrow Left Icon" className="arrow-icon" />
            <p>Back to previous page</p>
          </button>
          <h1>
            <span className='text-gradient'>{genreName}</span> Movies
          </h1>
        </header>

        <section className='all-movies'>
          <div className='w-full flex justify-between items-center'>
            <h2>Movies in {genreName} Genre</h2>
          </div>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <Link to={`/movie/${movie.id}`} key={movie.id}>
                  <MovieCard movie={movie} />
                </Link>
              ))}
            </ul>
          )}
        </section>

        <MoviesPagination
          className='my-12'
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageData={moviesPagination}
        />
      </div>
    </main>
  );
};

export default GenreMovies;
