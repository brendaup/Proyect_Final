/* import React, { useContext, useState } from 'react';
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

export default SearchFilter;    */
import React, { useContext, useState } from 'react';
import { MovieContext } from '../../context/MoviesContext/MoviesContext';

const SearchFilter = () => {
  const { originalMovies, setDataMovies } = useContext(MovieContext);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredMovies = originalMovies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm)
    );

    setDataMovies(filteredMovies);
  };

  return (
    <div className="container-form-search">
      <div className="container-form">
        <form className="form-search">
          <input
            type="text"
            placeholder="Enter title"
            value={searchTerm}
            onChange={handleSearch}
          />
        </form>
      </div>
    </div>
  );
};

export default SearchFilter;



 



