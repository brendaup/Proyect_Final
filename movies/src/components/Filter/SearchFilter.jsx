import React, { useContext, useState } from 'react';
import { MovieContext } from '../../context/MoviesContext/MoviesContext';

const SearchFilter = () => {
  const { dataMovies, setDataMovies } = useContext(MovieContext);

   const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();

    const filteredMovies = dataMovies.filter(
      (movie) => movie.title.toLowerCase().includes(searchTerm)
    );

    setDataMovies(filteredMovies);
  };

  return (
    <div>
      <input type="text" placeholder="Search movies..." onChange={handleSearch} />
    </div>
  ); 

};

export default SearchFilter;    




 



