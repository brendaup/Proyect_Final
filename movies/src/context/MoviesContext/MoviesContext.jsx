import { createContext, useContext, useState } from "react";
import { createMovie, getMovies, getMovie, deleteMovie, updateMovie } from "../../api/movies"

//Creamos un contexto para las peliculas que va a venir de la funcion
//createContext de React

export const MovieContext = createContext();


//Exportamos un hook llamado useMovies que va a ser igual al uso del contexto

export const useMovies = () => {
    const context = useContext(MovieContext);
  
    if (!context) {
      throw new Error("useMovies must be used within a TaskProvider");
    }
  
    return context;
  };

//Exportamos la funcion MoviesProvider que será el contenedor para todos los
//componentes que pueden acceder

export function MoviesProvider({ children }) {
    const [movies, setMovies] = useState([]);
  
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
      console.log("res", res);
      
    };
  
    const deleteMovieR = async (id) => {
      const res = await deleteMovie(id);
      console.log(res);
    };
  
    const getMovieR = async (id) => {
      const res = await getMovie(id);
      return res.data;
    }
  
    const updateMovieR = async (id, task) => {
      const res = await updateMovie(id, task);
      console.log(res);
  
    }
  
    return (
      <MovieContext.Provider
        value={{
          movies,
          createMovieR,
          getMoviesR,
          deleteMovieR,
          getMovieR,
          updateMovieR
        }}
      >
        {children}
      </MovieContext.Provider>
    );
  }

