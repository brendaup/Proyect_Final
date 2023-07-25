import axios from "./axios";

import { useContext, useEffect } from "react";
import { MovieContext } from "../context/MoviesContext/MoviesContext";

export const getMovies = () => axios.get("/movies");

export const getMovie = (id) => axios.get(`/movies/${id}`);

export const createMovie = (movie) => axios.post("/movies", movie);

export const updateMovie = (id, movie) => axios.put(`/movies/${id}`, movie);

export const deleteMovie = (id) => axios.delete(`/movies/${id}`);

function Movies() {
  const {
    dataMovies,
    setDataMovies,
    originalMovies,
    setOriginalMovies,
    followMovies,
    setFollowMovies,
    setClickComments,
    setDataMoviesAll,
  } = useContext(MovieContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://64af02ecc85640541d4e06ee.mockapi.io/movies"
        );
        setDataMovies(response.data);
        setOriginalMovies(response.data);
        setDataMoviesAll(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [setDataMovies]);
}

export default Movies;
