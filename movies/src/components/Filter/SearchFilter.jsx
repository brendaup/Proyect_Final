import { useContext, useEffect, useState } from 'react';
import { MovieContext } from '../../context/MoviesContext/MoviesContext';
import Movies from '../../api/movies';
import "./SearchFilter.css"
import MovieFollow from '../MoviesFollow/MovieFollow';

const SearchFilter = () => {
  const { dataMovies, setDataMovies , originalMovies } = useContext(MovieContext);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
    setFilteredMovies(dataMovies.filter((movie) => movie.title.toLowerCase().includes(searchTerm)));
  };

  useEffect(() => {
    if(searchTerm.length > 0) {
      setDataMovies(filteredMovies);
    } else {
      setDataMovies(originalMovies);
    }
  }, [filteredMovies]);

  return (
    <>  
    <div className="search-filter">
    
      <div className="search-icon">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input type="text" placeholder="Search movies..." onChange={handleSearch} />
      </div>
     
    </div>
    <MovieFollow />
    </>
  );
};

export default SearchFilter;





 



