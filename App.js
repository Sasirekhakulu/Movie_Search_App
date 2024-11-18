import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';

const App = () => {
  const [searchQuery, setSearchQuery] = useState(''); // Store search query
  const [movies, setMovies] = useState([]); // Store fetched movies
  const [selectedMovie, setSelectedMovie] = useState(null); // Store selected movie for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Toggle modal visibility
  const [currentPage, setCurrentPage] = useState(1); // Track current page for pagination
  const [totalResults, setTotalResults] = useState(0); // Store total results from API

  // Fetch movies from the API
  const fetchMovies = async (page = 1) => {
    try {
      const response = await axios.get(`http://www.omdbapi.com/?s=${searchQuery}&apikey=acdb1d3c&page=${page}`);
      
      if (response.data.Response === "True") {
        setMovies((prevMovies) => [...prevMovies, ...response.data.Search]); // Append new movies
        setTotalResults(response.data.totalResults); // Set total results
      } else {
        setMovies([]); // No results found
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  // Handle search form submit
  const handleSearch = (e) => {
    e.preventDefault();
    setMovies([]); // Clear previous results
    setCurrentPage(1); // Reset to the first page
    fetchMovies(); // Fetch movies for the first page
  };

  // Load more movies for pagination
  const loadMoreMovies = () => {
    setCurrentPage(currentPage + 1); // Increment page number
    fetchMovies(currentPage + 1); // Fetch next page of results
  };

  // Fetch movie details for the modal
  const openMovieDetails = async (movieId) => {
    try {
      const response = await axios.get(`http://www.omdbapi.com/?i=${movieId}&apikey=acdb1d3c`);
      setSelectedMovie(response.data); // Set selected movie details
      setIsModalOpen(true); // Open modal
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  // Close the movie modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div className="App">
      <h1>Movie Search</h1>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={handleSearch} />

      <div className="movie-list">
        {movies.length === 0 ? (
          <p>No movies found. Try searching for something else!</p>
        ) : (
          movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} onMovieClick={openMovieDetails} />
          ))
        )}
      </div>

      {movies.length > 0 && movies.length < totalResults && (
        <button onClick={loadMoreMovies}>
          {movies.length >= totalResults ? 'No More Results' : 'Load More'}
        </button>
      )}

      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
};

export default App;
