import { useEffect } from "react";
import { useMovies } from "../../context/MoviesContext/MoviesContext";
import  MovieCard from "../../components/MovieCard/DataMovies"

import React from "react";

const Home = () => {
  const { movies, getMoviesR } = useMovies();

  useEffect(() => {
    getMoviesR();
  }, [movies]);

  return (
    <>
      <div>
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </>
  );
};

export default Home;
