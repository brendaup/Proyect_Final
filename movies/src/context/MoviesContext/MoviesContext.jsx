import { createContext, useContext, useState } from "react";
import { createMovie, getMovies, getMovie, deleteMovie, updateMovie} from "../../api/movies";

export const MovieContext = createContext();

export const useMovies = () => {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error("useMovies must be used within a TaskProvider");
  }

  return context;
};

export function MoviesProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [dataMovies, setDataMovies] = useState([]);
  const [originalMovies, setOriginalMovies] = useState([]);
  const [followMovies, setFollowMovies] = useState([]);
  const [comments, setComments] = useState([]);
  const [dataMoviesAll, setDataMoviesAll] = useState([]);
  const [findMovie, setFindMovie] = useState(null);

  const getMoviesR = async () => {
    try {
      const res = await getMovies();
      setMovies(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createMovieR = async (movie) => {
    const res = await createMovie(movie);
  };

  const deleteMovieR = async (id) => {
    const res = await deleteMovie(id);
  };

  const getMovieR = async (id) => {
    const res = await getMovie(id);
    return res.data;
  };

  const updateMovieR = async (id, movie) => {
    const res = await updateMovie(id, movie);
    console.log(res);
  };

  const removeMovieFromFollowed = (movieId) => {
    setFollowMovies((followMovies) =>
      followMovies.filter((movie) => movie.id !== movieId)
    );
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        createMovieR,
        getMoviesR,
        deleteMovieR,
        getMovieR,
        updateMovieR,
        dataMovies,
        setDataMovies,
        originalMovies,
        setOriginalMovies,
        followMovies,
        setFollowMovies,
        comments,
        setComments,
        removeMovieFromFollowed,
        dataMoviesAll,
        setDataMoviesAll,
        findMovie,
        setFindMovie,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}
