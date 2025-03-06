import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import '../SingleMovie.css';

const SingleMovie = () => {
  let { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [movie, setMovie] = useState(null)
  const navigate = useNavigate();

  const API_BASE_URL = 'https://api.themoviedb.org/3'
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY
  const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  }
  const fetchMovie = async () => {
    setIsLoading(true)
    setErrorMessage('')
    try {
      const endpoint = `${API_BASE_URL}/movie/${encodeURIComponent(movieId)}`


      const response = await fetch(endpoint, API_OPTIONS)


      if (!response.ok) {
        throw new Error('faild to fetch movies!')
      }

      const data = await response.json()


      if (data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies')
        setMovie(null)
        return
      }
      setMovie(data)



    } catch (error) {
      console.log(`Error for fetching movies: ${error}`);
      setErrorMessage('Error for fetching movies, something goes wrong!')

    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMovie()
  }, [movieId])

  const handleGoBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div className="movie-details-container">
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : errorMessage ? (
        <div className="error">{errorMessage}</div>
      ) : movie ? (
        <div className="movie-details">
          <div className="movie-header"
            style={{
              backgroundImage: movie.backdrop_path ?
                `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` :
                'none'
            }}>
            <button
              className='movie-back-button text-white flex items-center cursor-pointer border-none bg-transparent'
              onClick={handleGoBack}
            >
              <LazyLoadImage src="/left-arrow.svg" alt="Arrow Left Icon" className="arrow-icon" />
              <p>Back to previous page</p>
            </button>
            <div className="movie-header-content">
              <h1>{movie.title}</h1>
              {movie.tagline && <p className="tagline">{movie.tagline}</p>}
              <div className="movie-meta">
                {movie.release_date && (
                  <span className="release-date">
                    {new Date(movie.release_date).getFullYear()}
                  </span>
                )}
                {movie.runtime && (
                  <span className="runtime">
                    {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                  </span>
                )}
                {movie.vote_average && (
                  <span className="rating">
                    ★ {movie.vote_average.toFixed(1)}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="movie-content">
            <div className="movie-poster">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={`${movie.title} poster`}
                />
              ) : (
                <div className="no-poster">No poster available</div>
              )}
            </div>

            <div className="movie-info">
              {movie.overview && (
                <div className="overview">
                  <h3>Overview</h3>
                  <p>{movie.overview}</p>
                </div>
              )}

              {movie.genres && movie.genres.length > 0 && (
                <div className="genres">
                  <h3>Genres</h3>
                  <div className="genre-list">
                    {movie.genres.map(genre => (
                      <Link
                        to={`/genre/${genre.id}/${genre.name}`}
                        key={genre.id}
                        className="genre-tag hover:cursor-pointer hover:underline hover:text-blue-200"
                      >
                        {genre.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="additional-info">
                {movie.status && (
                  <div className="info-item">
                    <span className="label">Status:</span>
                    <span className="value">{movie.status}</span>
                  </div>
                )}

                {movie.original_language && (
                  <div className="info-item">
                    <span className="label">Language:</span>
                    <span className="value">{movie.original_language.toUpperCase()}</span>
                  </div>
                )}

                {movie.budget > 0 && (
                  <div className="info-item">
                    <span className="label">Budget:</span>
                    <span className="value">${movie.budget.toLocaleString()}</span>
                  </div>
                )}

                {movie.revenue > 0 && (
                  <div className="info-item">
                    <span className="label">Revenue:</span>
                    <span className="value">${movie.revenue.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-movie">No movie data available</div>
      )}
    </div>
  )
}

export default SingleMovie