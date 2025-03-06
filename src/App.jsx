import React, { useState, useEffect } from 'react'
import { useDebounce } from 'react-use'
import { updateSearchCount, getTrendingMovies } from './appwrite.js'
import { Link, Routes, Route } from 'react-router-dom';
import SingleMovie from './components/SingleMovie.jsx'
import MoviesPagination from './components/MoviesPagination'
import GenreMovies from './components/GenreMovies'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'
import MovieSort from './components/MovieSort'

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [movieList, setMovieList] = useState([])
  const [moviesPagination, setMoviesPagination] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [trendingMovies, setTrendingMovies] = useState([])
  const [sortItemList, setSortItemList] = useState(['popularity.desc', 'popularity.asc', 'release_date.desc', 'release_date.asc'])

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

  const fetchMovies = async (query) => {
    setIsLoading(true)
    setErrorMessage('')
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=${sortItemList[0]}&page=${currentPage}`

      const response = await fetch(endpoint, API_OPTIONS)


      if (!response.ok) {
        throw new Error('faild to fetch movies!')
      }

      const data = await response.json()


      if (data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies')
        setMovieList([])
        return
      }
      setMovieList(data.results || [])
      setMoviesPagination(data)
      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0])
      }

    } catch (error) {
      console.log(`Error for fetching movies: ${error}`);
      setErrorMessage('Error for fetching movies, something goes wrong!')

    } finally {
      setIsLoading(false)
    }
  }

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies()
      setTrendingMovies(movies)
    } catch (error) {
      console.log(`Error fetching trending movies: ${error}`);
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm)
  }, [debouncedSearchTerm, sortItemList[0], currentPage])

  useEffect(() => {
    loadTrendingMovies()
  }, [])

  return (
    <>
    <main>
      <div className='pattern' />
      <div className='wrapper'>
        <header>
          <LazyLoadImage src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        {trendingMovies.length > 0 && (
          <section className='trending'>
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <LazyLoadImage src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className='all-movies'>
          <div className='w-full flex justify-between items-center'>
            <h2>All Movies</h2>
            <MovieSort sortItemList={sortItemList} setSortItemList={setSortItemList} />
          </div>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>
                  {movieList.map((movie) => (
                    <Link to={`/movie/${movie.id}`} key={movie.id}>
                    <MovieCard key={movie.id} movie={movie} />
                    </Link>
              ))}
            </ul>
          )}
          </section>
          <MoviesPagination className='my-12' currentPage={currentPage} setCurrentPage={setCurrentPage} pageData={moviesPagination} />
      </div>
    </main>
      <footer className='w-full text-white/70 text-center py-4 min-h-28 flex items-end justify-center'>
        <p> 2025 Movie App. All rights reserved. Made by </p>
      </footer>
    </>
  )
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movie/:movieId" element={<SingleMovie />} />
      <Route path="/genre/:genreId/:genreName" element={<GenreMovies />} />
    </Routes>
  )
}

export default App