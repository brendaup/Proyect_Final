import { useEffect } from "react";
import { useMovies } from "../../context/MoviesContext/MoviesContext";
import  MovieCard from "../../components/MovieCard/DataMovies"
import DataMovies_style from "./DataMovies_style.css";
import React from "react";

const Home = () => {
  const { movies, getMoviesR } = useMovies();

  useEffect(() => {
    getMoviesR();
  }, []);

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
