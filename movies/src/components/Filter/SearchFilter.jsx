import { useContext, useEffect, useState } from 'react';
import { MovieContext } from '../../context/MoviesContext/MoviesContext';
import Movies from '../../api/movies';

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
    <div>
      <input type="text" placeholder="Search movies..." onChange={handleSearch} />
    </div>
  );
};

export default SearchFilter;





 



