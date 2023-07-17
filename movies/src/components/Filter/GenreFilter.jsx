import React, { useContext, useEffect, useState } from 'react';
import { MovieContext } from '../../context/MoviesContext/MoviesContext';
import axios from 'axios';

const GenreFilter = () => {
  const { setDataMovies, originalMovies } = useContext(MovieContext);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    axios.get("https://64af02ecc85640541d4e06ee.mockapi.io/movies")
      .then((response) => {
        const movieData = response.data;
        const cleanGenres = [...new Set(movieData.map((movie) => movie.genre))];
        setGenres(cleanGenres);
      })
      .catch((error) => {
        console.log('Error fetching movie data:', error);
      });
  }, []);

  const handleGenreChange = (event) => {
    const selectedGenre = event.target.value;

    if (selectedGenre === '') {
      setDataMovies(originalMovies); 
    } else {
      const filteredMovies = originalMovies.filter((movie) => movie.genre === selectedGenre);
      setDataMovies(filteredMovies);
    }
  };

  const renderGenreOptions = genres.map((genre, index) => (
    <option key={index} value={genre}>{genre}</option>
  ));

  return (
    <select onChange={handleGenreChange}>
      <option value="">All genres</option>
      {renderGenreOptions}
    </select>
  );
};

export default GenreFilter;

