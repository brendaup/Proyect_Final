import { useContext, useEffect } from 'react';

import { MovieContext } from '../context/MoviesContext/MoviesContext'

import axios from 'axios'


function Movies() {

    const { setDataMovies , setOriginalMovies } = useContext(MovieContext);
  

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('https://64af02ecc85640541d4e06ee.mockapi.io/movies');
          setDataMovies(response.data);
          setOriginalMovies(response.data)
        
        } catch (error) {
          console.log('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [setDataMovies]);

  
}

export default Movies
